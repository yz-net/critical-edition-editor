import { AviaryVideoBlockData } from '..';
import DebugLogger from '../../utils/DebugLogger';
import ValidatorFunction from './ValidatorFunction';

const logger = new DebugLogger('validImageBlockData').hush();
const validAviaryVideoBlockData: ValidatorFunction<AviaryVideoBlockData> = (data: any) => {

  logger.log('Validating video data ', data);
  logger.warn('Video data validation not implemented');
  // TODO - make sure there's a src at least

  // if (data.embedCode && !(typeof data.embedCode === "string")) { throw new Error("FootnoteParagraphBlockData requires .embedCode to be undefined or String") }
  // if (!data.id || !(typeof data.id === "string")) { throw new Error("FootnoteParagraphBlockData requires .id String") }
  // if (!data.label || !(typeof data.label === "string")) { throw new Error("FootnoteParagraphBlockData requires .label String") }

  return data as AviaryVideoBlockData;
};

export default validAviaryVideoBlockData;
