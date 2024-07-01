import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@components/ui/accordion';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@components/ui/breadcrumb';
import { H3, P } from '@components/ui/typography';

const Page = () => {
  return (
    <div className="mx-auto w-full px-3 pb-48 text-primary xl:max-w-[81rem] xl:px-0">
      <Breadcrumb className="pt-12">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/" className="text-primary/70">
              首頁
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="font-medium text-primary">
              常見問題
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Accordion type="single" collapsible className="mt-12">
        <AccordionItem value="item-1">
          <AccordionTrigger className="hover:no-underline">
            <H3>我可以如何使用 chillka 揪咖？</H3>
          </AccordionTrigger>
          <AccordionContent>
            <P>
              chillka
              揪咖是一個專為尋找和參與活動的平台。您可以通過我們的網站瀏覽最新的活動，選擇您感興趣的活動並輕鬆報名參加。此外，如果您找不到想參加的活動，您也可以在我們的平台上自行舉辦活動！只需登入您的帳戶，點擊「開始揪咖」按鈕，填寫相關表單並創建您的活動，讓更多人一同參與。
            </P>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger className="hover:no-underline">
            <H3>如何註冊和開始使用？</H3>
          </AccordionTrigger>
          <AccordionContent>
            <P>
              註冊 chillka
              揪咖非常簡單！您只需點擊首頁右上角的「註冊」按鈕，填寫必要欄位即可。一旦註冊完成，您即可開始探索和參與各種活動。
            </P>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger className="hover:no-underline">
            <H3>如何找到我感興趣的活動？</H3>
          </AccordionTrigger>
          <AccordionContent>
            <P>
              您可以通過我們的搜尋功能或者瀏覽不同類別的活動來找到您感興趣的活動。您還可以根據活動的地點、日期和類型進行篩選，以便更快速地找到符合您需求的活動。
            </P>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger className="text-left hover:no-underline">
            <H3>我能在 chillka 揪咖上創建自己的活動嗎？</H3>
          </AccordionTrigger>
          <AccordionContent>
            <P>
              可以的！如果您是活動組織者或者愛好者，您可以通過我們的網站建立您自己的活動。請在個人選單中找到「開始揪咖」選項，填寫相關的表單並舉辦您的活動。
            </P>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-5">
          <AccordionTrigger className="text-left hover:no-underline">
            <H3>chillka 揪咖的服務是免費的嗎？</H3>
          </AccordionTrigger>
          <AccordionContent>
            <P>
              註冊和瀏覽活動是完全免費的！然而，某些特定的活動可能會收取報名費用或其他費用，具體細節請參考每個活動的頁面。
            </P>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-6">
          <AccordionTrigger className="hover:no-underline">
            <H3>我可以同時參加多個活動嗎？</H3>
          </AccordionTrigger>
          <AccordionContent>
            <P>
              是的！您可以同時報名參加多個不同的活動。請確保您的時間表允許並合理安排活動參與，以充分享受每一個精彩的活動體驗。
            </P>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-7">
          <AccordionTrigger className="hover:no-underline">
            <H3>如何聯繫 chillka 揪咖？</H3>
          </AccordionTrigger>
          <AccordionContent>
            <P>
              如果您有任何疑問或需要幫助，請隨時通過 E-mail 聯繫我們的團隊，
              Email：
              <a href="mailto:chillka.offical@gmail.com">
                chillka.offical@gmail.com
              </a>
            </P>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default Page;
