import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { target: 1000, duration: '1m' },
    { target: 5000, duration: '10m' },
  ],
};

const baseUrl = __ENV.TASKOVERFLOW_URL || 'http://replace-me';

export default function () {
  const res = http.get(`${baseUrl}/api/v1/todos`);
  check(res, {
    'status was 200': (r) => r.status === 200,
  });
  sleep(1);
}
