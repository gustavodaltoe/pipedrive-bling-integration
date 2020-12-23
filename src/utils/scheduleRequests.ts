import { AxiosInstance } from 'axios';

export default function scheduleRequests(
  axiosInstance: AxiosInstance,
  intervalMs: number,
): void {
  let lastInvocationTime: number;

  const scheduler = (config: any) => {
    const now = Date.now();
    if (lastInvocationTime) {
      lastInvocationTime += intervalMs;
      const waitPeriodForThisRequest = lastInvocationTime - now;
      if (waitPeriodForThisRequest > 0) {
        return new Promise(resolve => {
          setTimeout(() => resolve(config), waitPeriodForThisRequest);
        });
      }
    }

    lastInvocationTime = now;
    return config;
  };

  axiosInstance.interceptors.request.use(scheduler);
}
