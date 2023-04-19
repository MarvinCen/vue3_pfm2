import { Response } from '@/types/global';

// eslint-disable-next-line import/prefer-default-export
export const simpleErrorHandler = (response: Response) => {
  if (!response.code) {
    // error of front end
  }
  switch (response.code) {
    case 300500: {
      // mistake
      break;
    }
    case 300501: {
      // error
      break;
    }
    default: {
      // do something...
    }
    // other exception handler...
  }
};
