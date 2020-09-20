import superagent from 'superagent';
import supertest from 'supertest';

interface Test extends supertest.Test {
  _assertStatus(status: number, res: Response): Error | undefined;
  _data: any;
  req: {
    _header: string;
  };
  res: {
    statusCode: string,
    statusMessage: string,
    httpVersion: string,
    headers: Record<string, string>;
    text: string;
  },
}

const stringifyRequest = (request: Test) => {
  const { req, res, _data } = request;

  const requestStr = [
    ...req._header.split('\r\n').slice(0, -1),
    ...JSON.stringify(_data).split('\n'),
  ].map(line => '> ' + line).join('\r\n');

  const responseStr = [
    [res.statusCode, res.statusMessage, res.httpVersion].join(' '),
    ...Object.entries(res.headers).map(([key, value]) => [key, value].join(': ')),
    '',
    res.text,
  ].map(line => '< ' + line).join('\r\n');

  return [requestStr, responseStr];
}

const plugin = (request: Test): void => {
  const _assertStatus = request._assertStatus.bind(request);

  request._assertStatus = (status: number, res: Response) => {
    const result = _assertStatus(status, res);

    if (result instanceof Error) {
      const [requestStr, responseStr] = stringifyRequest(request);

      return new Error([result.message, requestStr, responseStr].join('\n\n'));
    }

    return result;
  };
};

export const debug = plugin as (request: superagent.SuperAgentRequest) => void;
