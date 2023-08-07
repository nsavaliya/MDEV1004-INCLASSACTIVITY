package com.example.inclass10
import android.os.Bundle
import android.telecom.Call
import android.widget.Button
import androidx.appcompat.app.AppCompatActivity
import com.stripe.android.Stripe
import com.stripe.android.model.PaymentMethodCreateParams
import com.stripe.android.paymentsheet.PaymentSheet
import com.stripe.android.view.PaymentSheet
import org.json.JSONObject
import java.io.IOException
import javax.security.auth.callback.Callback

class MainActivity : AppCompatActivity() {

    private lateinit var checkoutButton: Button
    private lateinit var paymentSheet: PaymentSheet
    private val backendCheckoutUrl = "http://localhost:3000/api/payment"

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        checkoutButton = findViewById(R.id.checkoutButton)
        checkoutButton.isEnabled = false

        checkoutButton.setOnClickListener { didTapCheckoutButton() }

        fetchPaymentIntent()
    }

    private fun fetchPaymentIntent() {
        // Fetch the PaymentIntent client secret and publishable key from your backend
        // You can use any networking library or method here, for simplicity, I'll use OkHttp
        val client = OkHttpClient()
        val request = Request.Builder()
            .url(backendCheckoutUrl)
            .post(RequestBody.create(MediaType.parse("application/json"), "{}"))
            .build()

        client.newCall(request).enqueue(object : Callback {
            override fun onFailure(call: Call, e: IOException) {
                // Handle errors here
            }

            override fun onResponse(call: Call, response: Response) {
                val responseData = response.body()?.string()
                val jsonObject = JSONObject(responseData)
                val clientSecret = jsonObject.getString("clientSecret")
                val publishableKey = jsonObject.getString("publishableKey")

                runOnUiThread {
                    // Initialize the Stripe SDK with the publishable key
                    val stripe = Stripe(applicationContext, publishableKey)

                    // Create and configure a PaymentSheet instance
                    paymentSheet = PaymentSheet(this@MainActivity) { paymentResult ->
                        // Handle the payment result
                        when (paymentResult) {
                            PaymentSheet.Result.Completed -> println("Your order is confirmed")
                            PaymentSheet.Result.Canceled -> println("Canceled!")
                            is PaymentSheet.Result.Failed -> println("Payment failed: ${paymentResult.error}")
                        }
                    }

                    checkoutButton.isEnabled = true
                }
            }
        })
    }

    private fun didTapCheckoutButton() {
        // MARK: Start the checkout process
        paymentSheet.presentWithPaymentMethodCreateParams(
            PaymentMethodCreateParams.create(),
            PaymentSheet.Configuration().setMerchantDisplayName("Akrotech")
                .setShouldShowGooglePay(true)
        )
    }
}
