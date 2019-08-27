import { getModelKey } from '../../app/model/helpers/model';
import { QUOTE_ARCHIVED, QUOTE_INITIAL, QUOTE_ISSUED } from './quote';

export const quoteActions = (quote, availableActions) => {
  const actionArray = [];
  const componentKey = getModelKey(quote);
  if (availableActions.cloneQuote)
    actionArray.push({
      iconName: 'clone',
      iconTitle: 'copy quote',
      iconAction: () => availableActions.cloneQuote(componentKey),
      iconDisabled: !quote.id,
    });
  if (availableActions.issueQuote)
    actionArray.push({
      iconName: 'mail',
      iconTitle: 'issue quote',
      iconAction: () => availableActions.issueQuote(componentKey),
      iconDisabled: quote.quote_status !== QUOTE_INITIAL,
    });
  if (availableActions.changeQuote)
    actionArray.push({
      iconName: 'eye',
      iconTitle: 'view quote',
      iconAction: () => availableActions.changeQuote(componentKey),
      iconDisabled: quote.quote_status === QUOTE_ARCHIVED,
    });
  if (availableActions.getQuote)
    actionArray.push({
      iconName: 'edit',
      iconTitle: 'edit quote',
      iconAction: () => availableActions.getQuote(componentKey),
      iconDisabled: !quote.id,
    });
  if (availableActions.archiveQuote)
    actionArray.push({
      iconName: 'remove',
      iconTitle: 'archive quote',
      iconAction: () => availableActions.archiveQuote(componentKey),
      iconDisabled: quote.quote_status === QUOTE_ARCHIVED,
    });
  if (availableActions.unarchiveQuote)
    actionArray.push({
      iconName: 'undo',
      iconTitle: 'un-archive quote',
      iconAction: () => availableActions.unarchiveQuote(componentKey),
      iconDisabled: quote.quote_status !== QUOTE_ARCHIVED,
    });
  if (availableActions.placeOrder)
    actionArray.push({
      iconName: 'thumbs up',
      iconTitle: 'place order',
      iconAction: () => availableActions.placeOrder(componentKey),
      iconDisabled: quote.quote_status !== QUOTE_ISSUED,
    });
  return actionArray;
};
