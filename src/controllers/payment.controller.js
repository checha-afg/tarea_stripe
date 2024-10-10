import Stripe from 'stripe'

//esto de aca es la clave secreta de MI SPRITE, si queremos redirigirlo a otro hay que usar una clave secreta diferente
const stripe = new Stripe('sk_test_51Q8MmwRxazJ4JItPwJYkyXjAp0yzeDq8wjiGwsIKQWk1SiAnZvnWpmqVxfsX5Tma0RdViSuf8FUrcDvlst3yqoCl00irXJTGlO')

export const createSession = async (req,res) => {
    const session = await stripe.checkout.sessions.create({
        line_items: [
            {
                price_data:{
                    product_data:{
                        name: 'Gato Gordo',
                        description: 'Gato de clase Gordo'
                    },
                    currency:'usd',
                    unit_amount:500 //esto es 5.00, existe la opcion 'unit_amount_decimal' pero aca no la use
                },
                quantity: 2
            },
            {
                price_data:{
                    product_data:{
                        name: 'Gato Flaco',
                        description: 'Gato de clase Flaco'
                    },
                    currency:'usd',
                    unit_amount:500 
                },
                quantity: 2
            }
        ],

        mode: 'payment',
        success_url: 'http://localhost:4000/success',
        cancel_url: 'http://localhost:4000/cancel'
    })
    return res.json(session)
}
