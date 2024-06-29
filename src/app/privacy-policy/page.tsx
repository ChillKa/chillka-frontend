import InfoNavbar from '@components/Navbar/InfoNavbar';
import { H2, H3, P } from '@components/ui/typography';

const Page = () => {
  const TITLE_OF_CONTENT = [
    {
      name: '授權協議',
      id: 'authorization-agreement',
    },
    {
      name: '使用條件',
      id: 'terms-of-use',
    },
    {
      name: '隱私政策',
      id: 'privacy-policy',
    },
    {
      name: '責任限制',
      id: 'limitation-of-liability',
    },
    {
      name: '爭議解決',
      id: 'dispute-resolution',
    },
  ];

  return (
    <div className="mx-auto flex w-full px-3 pb-48 pt-24 text-primary xl:max-w-[81rem] xl:px-0">
      <InfoNavbar data={TITLE_OF_CONTENT} className="mt-12" />
      <div className="flex-1 space-y-12">
        <div>
          <H2>隱私權政策</H2>
          <P>
            「chillka 揪咖」網站使用條款 歡迎訪問「chillka
            揪咖」網站（網址：https://chillka-frontend.onrender.com/）。請在使用本網站服務之前仔細閱讀以下條款和條件。進入或使用本網站即表示您同意遵守以下條款和條件。如果您不同意這些條款，請停止使用本網站服務。
          </P>
        </div>
        <div>
          <H3 id="authorization-agreement">授權協議</H3>
          <P>
            這個網站是由「chillka
            揪咖」運營。網站上的所有內容（包括文字、圖像、視頻和其他材料）受版權和其他知識產權法律保護。未經「chillka
            揪咖」明確授權，嚴禁複製、修改、重新發布或分發本網站的內容。
          </P>
        </div>
        <div>
          <H3 id="terms-of-use">使用條件</H3>
          <P>
            您使用本網站的風險自負。我們不對因使用本網站而導致的損失或損害承擔任何責任。使用本網站時，請遵守當地法律法規。我們保留隨時更改或終止本網站服務的權利，恕不另行通知。
          </P>
        </div>
        <div>
          <H3 id="privacy-policy">隱私政策</H3>
          <P>
            我們尊重用戶的隱私權。您使用本網站即表示同意我們按照我們的隱私政策處理個人信息。請閱讀我們的隱私政策，了解我們如何收集、使用和共享您的信息。
          </P>
        </div>
        <div>
          <H3 id="limitation-of-liability">責任限制</H3>
          <P>
            在法律允許的範圍內，我們不對因使用本網站而導致的任何直接或間接損失承擔責任。我們不擔保本網站將不受干擾、及時、安全或無錯誤運行。
          </P>
        </div>
        <div>
          <H3 id="dispute-resolution">爭議解決</H3>
          <P>
            本使用條款受台灣法律管轄。任何因本網站服務而引起的爭議應首先通過友好協商解決。如果協商失敗，雙方同意接受台灣法院的專屬管轄權。
          </P>
        </div>
        <P>
          謝謝您閱讀「chillka
          揪咖」網站的使用條款。如果您有任何疑問或疑慮，請通過網站上提供的聯絡方式與我們聯繫。
        </P>
      </div>
    </div>
  );
};

export default Page;
