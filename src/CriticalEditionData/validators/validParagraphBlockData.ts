import { ParagraphBlockData } from '..';
import DebugLogger from '../../utils/DebugLogger';
import ValidatorFunction from './ValidatorFunction';

const logger = new DebugLogger('validParagraphBlockData').hush();

const validParagraphBlockData: ValidatorFunction<ParagraphBlockData> = (
  data: any
) => {
  logger.log('Validating paragraph', data);
  if (!data) {
    throw new Error('No block data received');
  }
  if (!(typeof data.text === 'string')) {
    throw new Error('ParagraphBlock.data requires .text String');
  }

  return data as ParagraphBlockData;
};

export default validParagraphBlockData;
