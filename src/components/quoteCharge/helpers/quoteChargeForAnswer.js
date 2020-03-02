//    if quote_answer.answer is True:
//         if quote_answer.question.charge:
//             if not QuoteCharge.objects.filter(quote=quote_answer.quote,
//             charge=quote_answer.question.charge).exists():
//                 charge_price = quote_answer.question.charge.price
//                 if quote_answer.question.charge.percentage:
//                     quote_total = quote_answer.quote.calculated_price
//                     + quote_answer.quote.fixed_price_total
//                     if quote_answer.quote.quote_price:
//                         quote_total = quote_answer.quote.quote_price
//                         + quote_answer.quote.fixed_price_total
//                     charge_price = quote_total * quote_answer.question.charge.percentage / 100
//
//                 quote_charge = QuoteCharge(quote=quote_answer.quote
//                 , charge=quote_answer.question.charge,
//                                            price=charge_price)
//                 quote_charge.save()
//                 create_note_for_quote_charge(quote_charge, user, 'Auto added')
