import {quoteDescription} from "./quote";
import {findObjectWithId, updateObject} from "../../../helpers/utils";
import {quotePrice} from "./quotePrice";

export const copyToNewQuote = (quote, customer,
      bike,
      customers,
      frames,
      bikes,
      brands, charges) => {
  if (customer === quote.customer && bike === quote.bike) {
    return updateObject(quote, {id: undefined, version: quote.version + 1});
  }

  const oldBike = findObjectWithId(bikes, quote.bike);
  const newBike = findObjectWithId(bikes, bike);
  const oldCustomer = findObjectWithId(customers, quote.customer);
  const newCustomer = findObjectWithId(customers, customer);

      const quote_desc = quoteDescription(
      customer,
      bike,
      fullCustomers,
      frames,
      fullBikes,
      brands,
        charges
    );
      const copiedQuote = updateObject(quote, {
        id: undefined,
        quote_desc,
        version: 1,
        customer,
        bike,
      });
      if (oldBike !== newBike) {
        copiedQuote.quoteParts = quote.quoteParts.map(qp => {
          if (qp.not_required)
        })
      }
      if (newCustomer !== oldCustomer) {
        copiedQuote.quoteCharges = [];
      }
      return quotePrice(copiedQuote, newBike, charges);
};
// //
//
// # create a new quote based on an existing quote
// def copy_quote_part_to_new_quote(quote_part, new_quote):
//     quote_part.id = None
//     quote_part.quote = new_quote
//
//     if quote_part.part:
//         supplier_product = SupplierProduct.objects.filter(part=quote_part.part).first()
//         if supplier_product:
//             if new_quote.bike:
//                 quote_part.part_price = supplier_product.fitted_price
//             else:
//                 quote_part.ticket_price = supplier_product.ticket_price
//                 if new_quote.club_member:
//                     quote_part.club_price = supplier_product.club_price
//     quote_part.save()
//
//
// def copy_quote_with_changes(old_quote, user, quote_desc, bike, customer):
//     # get the quote you are basing it on and create a copy_quote
//     copy_customer = old_quote.customer
//     copy_fitting = old_quote.fitting
//     copy_quote_desc = old_quote.quote_desc
//     if customer:
//         if type(customer) == Customer:
//             copy_customer = customer
//             copy_fitting = None
//         else:
//             raise TypeError('Customer object expected')
//
//     if quote_desc:
//         copy_quote_desc = quote_desc
//
//     # copy quote details
//     new_quote = Quote.objects.get(pk=old_quote.pk)
//     new_quote.pk = None
//     new_quote.quote_price = None
//     new_quote.customer = copy_customer
//     new_quote.club_member = copy_customer.club_member
//     new_quote.fitting = copy_fitting
//     new_quote.quote_status = INITIAL
//     new_quote.issued_date = None
//
//     new_quote.created_by = user
//     new_quote.quote_desc = copy_quote_desc
//
//     quote_same_name =
//     Quote.objects.filter(customer=copy_customer, quote_desc=copy_quote_desc).count()
//     new_quote.version = quote_same_name + 1
//
//     if bike:
//         if new_quote.bike:
//             if type(bike) == Bike:
//                 new_quote.bike = bike
//                 new_quote.bike_price = None
//                 new_quote.colour = None
//                 new_quote.frame_size = None
//             else:
//                 raise TypeError('Bike object expected')
//         else:
//             raise ValueError('Bike change requested for non Bike quote')
//     # save creates all the parts required for a bike
//     new_quote.save()
//
//     # get parts from old quote and copy across to new_quote
//     old_quote_parts = QuotePart.objects.filter(quote=old_quote)
//     for old_quote_part in old_quote_parts:
//         copy_quote_part_to_new_quote(old_quote_part, new_quote)
//
//     new_quote.recalculate_price()
//     return new_quote
