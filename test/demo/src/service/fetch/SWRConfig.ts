import { ConfigInterface } from 'swr';
const SWRConfigValue: ConfigInterface = {
  suspense: false,
  revalidateOnFocus: false,
  refreshWhenHidden: false,
  loadingTimeout: 10000,
  shouldRetryOnError: false,
  refreshInterval: 0,
};

export default SWRConfigValue;
