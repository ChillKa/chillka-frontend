import InfoNavbar from '@components/Navbar/InfoNavbar';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@components/ui/breadcrumb';
import { H2, H3, P } from '@components/ui/typography';

const TITLE_OF_CONTENT = [
  {
    name: '使命',
    id: 'mission',
  },
  {
    name: '價值',
    id: 'value',
  },
  {
    name: '願景',
    id: 'vision',
  },
  {
    name: '聯繫我們',
    id: 'contact',
  },
];

const Page = () => {
  return (
    <div className="mx-auto w-full px-3 pb-48 text-primary xl:max-w-[81rem] xl:px-0">
      <Breadcrumb className="pt-12 xl:px-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/" className="text-primary/70">
              首頁
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="font-medium text-primary">
              關於我們
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex pt-12">
        <InfoNavbar data={TITLE_OF_CONTENT} className="mt-12" />
        <div className="flex-1 space-y-12">
          <div>
            <H2 className="mb-2">關於我們</H2>
            <P>
              「chillka
              揪咖」的誕生源於我們對於生活的熱愛和對於社交的渴望。在現代都市生活中，我們常常感到活動選擇有限、交友不易，於是我們決定創建這個平台，讓人們更輕鬆地找到有趣的活動，並與喜歡相同事物的人們相聚。
            </P>
          </div>
          <div>
            <H3 id="mission" className="mb-2">
              使命
            </H3>
            <P>
              我們致力於打破社交隔閡，讓每一個人都可以輕鬆找到適合自己的活動，無論是單獨冒險、雙人浪漫，還是團體狂歡。「chillka
              揪咖」相信，每一次精彩的體驗都應該和更多的人分享，這樣才能讓生活更加豐富和有意義。
            </P>
          </div>
          <div>
            <H3 id="value" className="mb-2">
              價值
            </H3>
            <P>
              便利性：透過智能化平台，您可以輕鬆找到附近的活動，並即時報名參與。
            </P>
            <P>
              多樣性：無論您喜歡的是文化藝術、運動健身，還是生態探險，我們都有合適的選擇。
            </P>
            <P>社交化：我們不僅提供活動平台，更是一個交流和分享的社群。</P>
          </div>
          <div>
            <H3 id="vision" className="mb-2">
              願景
            </H3>
            <P>
              未來，我們希望能成為您生活中不可或缺的一部分，無論是在您找尋娛樂活動、結交新朋友，或者只是想要擴展自己的社交圈子時，「chillka
              揪咖」都能夠成為您的首選。
            </P>
          </div>
          <div>
            <H3 id="contact" className="mb-2">
              聯繫我們
            </H3>
            <P>
              無論您有任何疑問或建議，我們都非常樂意聆聽您的想法。請隨時通過以下方式與我們聯繫：
            </P>
            <P>
              Email：
              <a href="mailto:chillka.offical@gmail.com">
                chillka.offical@gmail.com
              </a>
            </P>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
