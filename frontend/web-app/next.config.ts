import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  logging:{
    fetches:{
      fullUrl: true
    }
  } 
  //  options: {
  //           "ssl":true,
  //           "sslCert": "ssl/localhost.pem",
  //           "sslKey": "ssl/localhost-key.pem"
  //         },

};

export default nextConfig;
