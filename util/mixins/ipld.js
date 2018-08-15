import axios from '@/plugins/axios';

import { getIpldLink } from '~/util/index';

export default {
  data() {
    return {
      iplds: [],
    };
  },
  methods: {
    async fetchIplds(list) {
      try {
        const requests = list.map((ipld, i) => {
          if (this.isIpldFetched(ipld, i)) return null;
          return axios.get(getIpldLink(ipld), {
            withCredentials: false,
          });
        });
        const results = await Promise.all(requests);

        const iplds = results.map((res, index) => {
          if (!res) return null;
          const { type, license: licenseUrl, ...ipldData } = res.data;
          return {
            ...ipldData,
            ipld: list[index],
            licenseUrl,
          };
        });

        const hasFetchedIplds = iplds.some((ipld) => !ipld);
        if (hasFetchedIplds) {
          const newIplds = [...this.iplds];
          iplds.forEach((ipld, i) => {
            if (ipld) newIplds[i] = ipld;
          });
          this.iplds = newIplds;
        } else {
          this.iplds = iplds;
        }
      } catch (err) {
        console.error(err); // eslint-disable-line no-console
      }
    },
    isIpldFetched(ipld, index) {
      return (this.iplds[index] || {}).ipld === ipld;
    },
  },
};
