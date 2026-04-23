import { Metadata } from "next";
import "@/app/globals.css";
import ApolloSetting from "@/commons/settings/apollo-setting";

export const metadata: Metadata = {
  title: "travel world",
  description: "welcome!",
};

const RootLayout = (props) => {
  return (
    <html lang='ko'>
      <body>
        <div>레이아웃 시작</div>
        <ApolloSetting>{props.children}</ApolloSetting>
        <div>레이아웃 끝</div>
      </body>
    </html>
  );
};

export default RootLayout;
