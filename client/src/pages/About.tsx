export default function About() {
  return (
    <section className="container max-w-4xl mx-auto px-5 py-8" data-testid="about-page">
      <h1 className="text-5xl font-bold text-primary text-center mb-8 font-serif" data-testid="about-title">
        เกี่ยวกับนิทรรศการ
      </h1>
      
      <div className="space-y-8 text-lg leading-relaxed">
        <p data-testid="about-description-1">
          นิทรรศการศิลปะออนไลน์แห่งนี้เป็นพื้นที่แสดงผลงานศิลปะร่วมสมัยที่รวบรวมผลงานจากศิลปินไทยและต่างประเทศ 
          เพื่อสร้างประสบการณ์ใหม่ในการชมศิลปะผ่านเทคโนโลยีดิจิทัล
        </p>
        
        <p data-testid="about-description-2">
          เราได้คัดสรรผลงานศิลปะที่หลากหลายในรูปแบบต่างๆ ไม่ว่าจะเป็นจิตรกรรม ประติมากรรม ศิลปะป๊อป คิวบิสม์ 
          และศิลปะไทยร่วมสมัย เพื่อนำเสนอมุมมองและแนวคิดที่แตกต่างกันของศิลปินแต่ละท่าน
        </p>
        
        <p data-testid="about-description-3">
          วัตถุประสงค์ของนิทรรศการนี้คือการส่งเสริมให้ผู้คนเข้าถึงศิลปะได้ง่ายขึ้น สร้างความเข้าใจและความชื่นชมในผลงานศิลปะ 
          รวมทั้งสนับสนุนศิลปินให้มีพื้นที่ในการแสดงผลงานและเผยแพร่แนวคิดสร้างสรรค์
        </p>
        
        <div className="bg-card p-8 rounded-lg border border-border" data-testid="about-categories">
          <h3 className="text-2xl font-semibold text-primary mb-6 font-serif">หมวดหมู่ผลงาน</h3>
          <ul className="space-y-4 text-base">
            <li className="flex items-center py-3 border-b border-border" data-testid="category-visual-arts">
              <span className="text-2xl mr-4">🎨</span>
              แผ่นพับ อาชีพทัศนศิลป์
            </li>
            <li className="flex items-center py-3 border-b border-border" data-testid="category-popup">
              <span className="text-2xl mr-4">✨</span>
              Pop-up Art
            </li>
            <li className="flex items-center py-3 border-b border-border" data-testid="category-sculpture">
              <span className="text-2xl mr-4">🗿</span>
              ประติมากรรม
            </li>
            <li className="flex items-center py-3 border-b border-border" data-testid="category-cubism">
              <span className="text-2xl mr-4">📐</span>
              Cubism Art
            </li>
            <li className="flex items-center py-3" data-testid="category-thai-pop">
              <span className="text-2xl mr-4">🇹🇭</span>
              Thai Pop Art
            </li>
          </ul>
        </div>
        
        <p className="text-center italic text-muted-foreground text-xl" data-testid="about-quote">
          "ศิลปะคือภาษาสากลที่เชื่อมโยงหัวใจของมนุษย์เข้าด้วยกัน"
        </p>
      </div>
    </section>
  );
}
