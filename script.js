
let currentPage = 0;
const questionsPerPage = 6;
let answers = [];

const quizContainerEl = document.getElementById('quiz-container');
const questionCounterEl = document.getElementById('question-counter');
const nextBtn = document.getElementById('next-btn');
const prevBtn = document.getElementById('prev-btn');
const resultEl = document.getElementById('result');
const progressBarEl = document.getElementById('progress-bar');
const progressContainerEl = document.getElementById('progress-container');

const questions = [
  {
    question: "締切まで1週間の新しいタスク。まず最初にすることは？",
    axis: "action",
    options: { left: "必要な情報を集め、1時間かけて計画を立てる", right: "すぐに手を動かし始め、やりながら軌道修正する" },
  },
  {
    question: "SAE（重篤な有害事象）の一報。あなたの初動は？",
    axis: "action",
    options: { left: "まず状況を整理し、報告ルートを確認してから動く", right: "即座に施設へ電話し、直接詳細を確認する" },
  },
  {
    question: "医療機関から前例のない質問を受けた時の対応は？",
    axis: "action",
    options: { left: "「確認して折り返します」と伝え、社内で徹底的に調べてから回答する", right: "その場で考えられる最善の暫定回答をし、後で確認・補足する" },
  },
  {
    question: "モニタリングの準備スタイルは？",
    axis: "action",
    options: { left: "全ての可能性を想定し、完璧な計画と資料を準備する", right: "大枠だけ決め、現場の状況に合わせて柔軟に対応する" },
  },
  {
    question: "チームで新しいツールを導入する時、あなたは？",
    axis: "action",
    options: { left: "導入前にマニュアルを熟読し、全ての機能を理解しようとする", right: "まずは触ってみて、試行錯誤しながら使い方を覚える" },
  },
  {
    question: "あなたの仕事の進め方は？",
    axis: "action",
    options: { left: "石橋を叩いて渡るように、リスクを排除してから進む", right: "スピードを重視し、走りながら問題を解決していく" },
  },

  {
    question: "モニタリング訪問が予定より早く終わったら？",
    axis: "focus",
    options: { left: "次のタスクのため、早めに施設を後にして時間を有効活用する", right: "CRCと雑談し、関係性を深める良い機会にする" },
  },
  {
    question: "CRCから業務に関する相談を受けた時、あなたは？",
    axis: "focus",
    options: { left: "効率よく結論を出すため、要点を整理して最短で解決策を提示する", right: "まずは話をじっくり聞き、相手の状況や気持ちを理解してから対応する" },
  },
  {
    question: "チームミーティングでのあなたの主な役割は？",
    axis: "focus",
    options: { left: "議題が脱線しないよう、時間内に結論を出すことを促す", right: "全員が発言しやすい雰囲気を作り、チームの和を大切にする" },
  },
  {
    question: "施設スタッフへ手順の逸脱を指摘する時、どう伝える？",
    axis: "focus",
    options: { left: "プロトコールやSOPの該当箇所を明示し、事実ベースで簡潔に伝える", right: "相手の状況を配慮し、改善のための提案やサポートも含めて丁寧に伝える" },
  },
  {
    question: "あなたにとって理想のチームとは？",
    axis: "focus",
    options: { left: "各自が責任を果たし、効率的に成果を出すプロ集団", right: "互いに助け合い、一体感を持って目標に向かう家族のような集団" },
  },
  {
    question: "医療機関との連絡手段で好むのは？",
    axis: "focus",
    options: { left: "記録が残り、要点が明確なメールやチャット", right: "ニュアンスが伝わり、関係性が深まる電話や対面" },
  },
  
  {
    question: "1日のスケジュールについて、あなたの考えは？",
    axis: "structure",
    options: { left: "朝立てた予定通りに進めたい。急な割り込みはストレス", right: "優先順位は常に変わるもの。柔軟に対応するのが普通" },
  },
  {
    question: "あなたのPCのデスクトップやフォルダ構成は？",
    axis: "structure",
    options: { left: "ルールを決めて整理整頓され、どこに何があるか明確", right: "少し雑然としている方が、かえって創造性が湧く" },
  },
  {
    question: "SOPに記載のないグレーな事象が発生したら？",
    axis: "structure",
    options: { left: "まずはルールや前例がないか徹底的に調べ、それに従う", right: "目的を達成するために、最も合理的だと思う方法をその場で判断する" },
  },
  {
    question: "出張計画の立て方は？",
    axis: "structure",
    options: { left: "移動、訪問、食事の時間まで細かく計画を立てておきたい", right: "訪問時間だけ決め、他はその場の流れで柔軟に楽しみたい" },
  },
  {
    question: "チーム共有のテンプレートが少し使いにくい。どうする？",
    axis: "structure",
    options: { left: "統一性を重視し、まずはルール通りに使う", right: "自分の使いやすいようにカスタマイズして効率を上げる" },
  },
  {
    question: "業務の進め方について、あなたの好みは？",
    axis: "structure",
    options: { left: "一つのタスクに集中し、完了させてから次に進みたい", right: "複数のタスクを並行して切り替えながら進める方が得意" },
  },

  {
    question: "プロトコールを初めて読む時、あなたがまず注目するのは？",
    axis: "thinking",
    options: { left: "来院スケジュール、検査項目、併用禁止薬など具体的な実施内容", right: "試験の背景、目的、仮説など、この試験が目指すゴール" },
  },
  {
    "question": "フィージビリティ調査で、複数の候補施設の情報を比較するとき、あなたの着眼点は？",
    "axis": "thinking",
    "options": {
      "left": "各施設の設備数・人員数・過去実績を数値で並べて比較する",
      "right": "施設ごとの強み・弱みの組み合わせが、試験デザインにどう影響するかをシミュレーションする"
    }
  },
  {
    question: "施設から「被験者登録が進まない」と相談された時、あなたは？",
    axis: "thinking",
    options: { left: "具体的な対応策（紹介経路の拡大、適格基準の再確認など）を提案する", right: "なぜ登録が進まないのか、根本的な要因（施設特性、疾患特性など）を探る" },
  },
  {
    question: "新しい治療薬について学ぶ時、何に興味が湧く？",
    axis: "thinking",
    options: { left: "用法・用量、投与方法、副作用の種類と対処法などの実務情報", right: "作用機序、既存治療との違い、将来的な治療体系への影響" },
  },
  {
    question: "SDVでデータの不一致を発見した時、あなたの思考は？",
    axis: "thinking",
    "options": {
      "left": "不整合の箇所を一つずつ検証し、原因を特定して即時修正を指示する",
      "right": "不整合の背景を試験全体の流れや潜在リスクと関連づけ、長期的な予防策を提案する"
    }
  },
  {
    question: "キャリアについて考える時、どちらを重視する？",
    axis: "thinking",
    options: { left: "今のスキルを活かせる、明確で実現可能なキャリアパス", right: "新しい領域や役割に挑戦できる、可能性が広がるキャリアパス" },
  }
];

const axisValues = {
  action: { left: "分析型", right: "実行型" },
  focus: { left: "タスク重視", right: "人間関係重視" },
  structure: { left: "構造型", right: "適応型" },
  thinking: { left: "具体思考", right: "抽象思考" }
};

const typeMap = {
    "分析型タスク重視構造型具体思考": { 
        name: "治験品質の番人",
        image: "書記官ビーバー.png",
        catchphrase: "「正確・誠実・信頼の三拍子」タイプ",
        persona: "書記官ビーバー",
        description: `事実とデータに基づき、計画通りに業務を遂行する信頼性の高いスペシャリスト。急な変更よりも、確立された手順に沿って着実に進めることを得意とします。あなたのレビューした文書は、どんな監査でも揺るがない完璧な仕上がり。チームに安定と品質をもたらす、まさに治験の守護神です。`,
        aruaru: [
            "モニタリング報告書を提出する前に、声に出して3回は読み返す。",
            "会議で「その根拠はSOPのp.38、第5項に記載があります」と即答できる。",
            "休暇前の引継ぎ資料が、もはや新人研修用の資料レベルの詳しさ。"
        ],
        strengths_weaknesses: {
            strong: "監査や査察で鉄壁のディフェンス力を発揮する文書作成・レビュー能力。",
            weak: "プロトコールに記載のないイレギュラーな事態に対し、最初の判断に時間がかかりがち。"
        },
        skill: "アジャイル思考: 状況に応じて「80点でOK」と判断し、完璧主義とスピードのバランスを取る柔軟性。",
        workstyle: "大規模試験のデータ品質管理や長期にわたる製造販売後調査で力を発揮します。データクリーニングやTMF整備、監査対応など、精度を支える業務に強みを持ちます。",
        career_path: "その正確性を活かし、QA（品質保証）、QC（品質管理）、CRAの基礎を教えるトレーナーなどが向いています。"
    },
    "分析型タスク重視構造型抽象思考": { 
        name: "未来を見通す戦略家",
        image: "戦略家フクロウ.png",
        catchphrase: "「本質を見抜き、最適な仕組みを構築する」タイプ",
        persona: "戦略家フクロウ",
        description: `業務の本質を見抜き、常に「より良い方法」を模索する戦略的思考の持ち主。表面的な作業に満足せず、「なぜこの業務が必要なのか」と問い続け、非効率なプロセスを抜本的に改善します。あなたが構築したExcelマクロや進捗管理の仕組みは、チームの生産性を劇的に向上させる重要インフラとなります。`,
        aruaru: [
            "「このSDV、本当に全例必要ですか？リスクベースで考えましょう」と会議で問題提起しがち。",
            "繰り返し発生する非効率な業務を見つけると、自動化ツールやテンプレートを作成してしまう。",
            "「前例がない」という理由での却下に納得できず、エビデンスを集めて再提案する粘り強さがある。"
        ],
        strengths_weaknesses: {
            strong: "業務プロセスの非効率を見抜き、本質的な改善策を立案する戦略的思考力。",
            weak: "周囲の納得を得るための丁寧な説明を省略しがちで、「ついていけない」と思われることがある。"
        },
        skill: "ステークホルダーマネジメント: 自分のアイデアを周囲に「腹落ち」させ、巻き込んでいくプレゼンテーション能力。",
        workstyle: "DCTの導入、AIを活用したデータレビュー効率化など、最先端の臨床開発手法が求められるプロジェクトでリーダーシップを発揮します。",
        career_path: "将来的には、臨床開発の戦略立案やプロジェクトマネージャー、クリニカルサイエンティスト、開発部門の責任者へ。あなたの戦略的思考は、組織全体の競争力を高める原動力となります。"
    },
    "分析型タスク重視適応型具体思考": { 
        name: "頼れる現場のトラブルシューター",
        image: "職人カワウソ.png",
        catchphrase: "「冷静な判断力と、状況を見極める実践力」タイプ",
        persona: "職人カワウソ",
        description: `SAEの一報、デバイスのトラブル…。予期せぬ事態こそ、あなたの専門性が最も輝く瞬間です。混乱した状況でも冷静に事実を分析し、現実的で的確な解決策を即座に導き出します。計画的な事務作業よりも、その場で発生する具体的な問題解決にやりがいを感じる、頼れる現場のプロフェッショナルです。`,
        aruaru: [
            "SAEの連絡を受けると、瞬時に優先順位を整理し、必要な対応ルートを脳内でシミュレーションしている。",
            "トラブル発生時、施設からの電話に落ち着いた声で的確な指示を出し、信頼を獲得する。",
            "日常業務の報告書作成は後回しになりがちだが、緊急時の報告書は驚くほど速く正確に仕上げる。"
        ],
        strengths_weaknesses: {
            strong: "予期せぬ事態における冷静な状況判断力と、複雑な問題を紐解く実践的な解決能力。",
            weak: "ルーチンワークや定型業務への集中力維持が課題。計画的な事務処理よりも、目の前の課題解決を優先してしまう傾向。"
        },
        skill: "業務の「仕組み化」: 定型業務はテンプレート化・自動化し、あなたの本領である問題解決に時間とエネルギーを集中させる環境づくり。",
        workstyle: "救急医療、オンコロジー、循環器など、緊急性の高い事象が発生しやすい領域で、施設・チームから最も頼られる存在になります。",
        career_path: "現場対応のスペシャリストとして深い専門性を築き、トラブルシューティングに強いシニアCRA、あるいは新人教育を担うメンター的ポジションへ。その実践知は組織の貴重な資産となります。"
    },
    "分析型タスク重視適応型抽象思考": { 
        name: "科学的洞察のスペシャリスト",
        image: "探求家アルパカ.png",
        catchphrase: "「深い知的探究心で、本質に迫る」タイプ",
        persona: "探求家アルパカ",
        description: `施設からの複雑な質問に、最新のエビデンスと論理で答えを導き出す知的プロフェッショナル。プロトコールの背景にある科学的根拠を誰よりも深く理解し、「なぜそうなのか」を探究します。ルールや常識に縛られず、様々な可能性を分析し、最も合理的な結論を導き出すあなたの深い洞察力は、試験の質を高める重要な役割を果たします。`,
        aruaru: [
            "CRCからの医学的な質問に、最新の文献やガイドラインを引用しながら、論理的に説明できる。",
            "「このエンドポイント設定、生物学的メカニズムから考えると…」と、プロトコールの科学的妥当性を深く考察している。",
            "データマネジメントや統計解析の担当者と話が合い、ランチを共にすることが多い。"
        ],
        strengths_weaknesses: {
            strong: "複雑な科学的概念を理解し、論理的に分析する能力。プロトコールの本質的な課題を見抜く洞察力。",
            weak: "完璧な答えを求めすぎて判断に時間がかかることがある。理論の探究に没頭し、実務的な期限とのバランスを取るのが課題。"
        },
        skill: "実践への橋渡し: 深い知識を実務的なアクションに変換し、「理想と現実」の両立を図るプロジェクトマネジメント思考。",
        workstyle: "医師主導治験、First-in-Human試験、希少疾患や新規モダリティ(遺伝子治療、細胞治療など)の探索的試験で、科学的専門性を最大限に発揮します。",
        career_path: "メディカルサイエンスリエゾン(MSL)、クリニカルサイエンティスト、メディカルアフェアーズなど、あなたの科学的洞察力は、革新的な治療法を患者さんに届ける重要な礎となります。"
    },
    "分析型人間関係重視構造型具体思考": { 
        name: "堅実なサポーター",
        image: "癒やしのカピバラ.png",
        catchphrase: "「静かな気遣いで現場を支える」タイプ",
        persona: "癒やしのカピバラ",
        description: `施設スタッフの忙しさを察し、さりげなく業務をフォローする気遣いのプロ。計画的に準備を進め、CRCが困らないよう具体的な資料を完璧に用意します。あなたの静かで献身的なサポートは、施設から「このCRAさんなら安心」と絶大な信頼を得る鍵。人を支えたいという思いと、確実な実務能力を兼ね備えた、現場に欠かせない存在です。`,
        aruaru: [
            "モニタリング前に施設の進捗をチェックし、CRCが困らないよう資料や質問リストを完璧に準備。",
            "CRCからデータに関する複雑な質問が来ても、わかりやすい説明で『これで大丈夫！』と安心させる。",
            "休暇前に、チームや施設が迷わないよう、相手の立場を考えた丁寧な引継ぎメモを残す。"
        ],
        strengths_weaknesses: {
            strong: "細やかな気遣いと計画性で、施設スタッフと強固な信頼関係を築く力。進捗管理の安定感。",
            weak: "施設やチームからの急な依頼を断れず、つい自分の負担を増やしてしまう。"
        },
        skill: "アサーティブ・コミュニケーション: 相手を尊重しつつ、自分の限界や優先順位を明確に伝えるスキル。",
        workstyle: "長期にわたる施設の進捗管理、CRCの業務支援、モニタリング時の細やかなフォローで真価を発揮。希少疾患や小児領域などで特に輝きます。",
        career_path: "Senior CRAとして長期的な施設支援で信頼を深め、CRAトレーナーやメンターとして新人教育に貢献、またはQCとしてモニタリングの品質を確保する役割で、安定感と気遣いを活かします。"
    },
    "分析型人間関係重視構造型抽象思考": { 
        name: "患者さんの想いを紡ぐストーリーテラー",
        image: "導きのイルカ.png",
        catchphrase: "「治験の意義を伝え、人を動かす理想家」タイプ",
        persona: "導きのイルカ",
        description: `治験のデータの先にいる患者さんの物語を想像し、その想いを丁寧に紡ぐ理想家。治験の持つ大きな意義や可能性を信じ、それを関係者に伝えることで、チームのモチベーションを高めます。あなたの深い共感力と計画的なアプローチは、治験の倫理性を高め、チームに「何のために働くのか」を思い出させる原動力です。`,
        aruaru: [
            "チーム会議で「この治験が患者さんの未来を変える」と熱く語り、メンバーのやる気を引き出す。",
            "ICF（説明同意文書）が患者にわかりやすいかを常に考え、施設に改善を提案してしまう。",
            "施設スタッフとの何気ない会話から信頼を築き、「あなたなら話せる」と深い課題を共有される。"
        ],
        strengths_weaknesses: {
            strong: "治験のビジョンを語り、関係者の心を動かす力。共感と計画性を融合させ、チームの意義を高める影響力。",
            weak: "理想と現実（例: 登録遅延や予算制約）のギャップに悩み、感情的なストレスを抱えやすい。"
        },
        skill: "ロジカルシンキング: 患者の想いや施設の課題をデータや計画に落とし込み、実行可能な提案にまとめる力。",
        workstyle: "患者リクルートメント支援、ICFの適切性確認、チームのモチベーション向上で真価を発揮します。希少疾患や社会貢献性の高い治験で特に輝きます。",
        career_path: "Patient Centricity担当、KOLや患者団体との対話を行うMSL、または治験の社会的意義を伝える広報・教育担当が適しています。"
    },
    "分析型人間関係重視適応型具体思考": { 
        name: "現場をつなぐ調整上手",
        image: "愛されラッコ.png",
        catchphrase: "「人に配慮しながら、現実的な解決策を探る」タイプ",
        persona: "愛されラッコ",
        description: `あなたが訪問すると、なぜかCRCも医師もホッとした表情に。柔らかな物腰で現場の本音を引き出し、課題を早期にキャッチ。杓子定規なルールよりも、現場の状況と人の気持ちを尊重し、現実的な落としどころを見つけるのが得意です。表に出ない努力で治験の円滑な進行を支えています。`,
        aruaru: [
            "CRCさんから『○○さんが担当でよかった』と言われると、その日1日が明るくなる。",
            "先生が忙しそうな時は、要件を端的に伝えるタイミングを自然に見計らえる。",
            "指摘メールを送る前に、文面を3回読み返して『角が立たないかな…』と悩む。"
        ],
        strengths_weaknesses: {
            strong: "現場の信頼を得ながら課題を早期にキャッチできる。人間関係を活かした現実的な解決力。",
            weak: "感情に配慮しすぎて、必要な指摘や是正を後回しにしてしまうことがある。"
        },
        skill: "『やわらかく、でも確実に伝える』指摘スキル：共感の言葉＋データや手順書に基づく根拠を添えることで、説得力と安心感を両立させよう。",
        workstyle: "人間関係が複雑な施設や、モチベーションが落ちているCRCを抱える施設で真価を発揮します。",
        career_path: "人との信頼構築力を活かして、リードCRA、教育担当CRA、または施設立ち上げ担当CRAとして活躍可能。"
    },
    "分析型人間関係重視適応型抽象思考": { 
        name: "薬に魂を込めるメッセンジャー",
        image: "夢見るフェネック.png",
        catchphrase: "「治験の理想を信じ、共感で人をつなぐ」タイプ",
        persona: "夢見るフェネック",
        description: `「この薬が、誰かの未来を変えるかもしれない」という強い信念が、あなたを突き動かす原動力。会社の理念や薬の開発秘話に誰よりも感動し、その情熱を現場に届けます。ルールや効率よりも、治験に関わる人々の想いや、その先にある可能性を大切にする、チームの良心ともいえる存在です。`,
        aruaru: [
            "被験者さんの背景ストーリーに感情移入しすぎて、夜眠れなくなることがある。",
            "会社の理念や、開発中の薬の秘話に感動して入社を決めたタイプ。",
            "DBL前の怒涛の施設訪問を終えた後、「私たちの仕事は尊い…」と一人、感動に浸る。"
        ],
        strengths_weaknesses: {
            strong: "患者への貢献というミッションに対する誰よりも強い情熱。チームの良心として倫理観を保つ。",
            weak: "費用交渉や契約といった、ドライな数字の議論が苦手。批判的なフィードバックに深く傷つきやすい。"
        },
        skill: "レジリエンス（精神的回復力）: 仕事と感情の間に良い意味での壁を作り、客観性を保つ訓練。",
        workstyle: "アンメットメディカルニーズの高い疾患領域（がん、難病など）や、社会貢献性の高いプロジェクトで情熱を燃せます。",
        career_path: "患者さんやその家族と直接関わる患者アドボカシー担当や、薬の価値を伝えるメディカルアフェアーズが適職です。"
    },
    "実行型タスク重視構造型具体思考": { 
        name: "プロジェクトを動かす鬼軍曹",
        image: "現場監督カンガルー.png",
        catchphrase: "「計画を立て、断行し、成果を出す」タイプ",
        persona: "現場監督カンガルー",
        description: `「で、アクションプランは？」が口癖の、頼れる進捗管理のプロフェッショナル。目標達成のために最も効率的な手順を素早く構築し、チームを力強く率います。その厳しいまでの期限遵守の姿勢は、プロジェクトを遅延から守る最後の砦。恐れられつつも、内心では誰もが絶大な信頼を寄せています。`,
        aruaru: [
            "会議で話が脱線すると「で、結論は？」「アクションプランを決めましょう」と軌道修正したくなる。",
            "チームメンバーのモニタリング報告書の提出遅延を、1分単位で把握している。",
            "進捗表や逸脱一覧の色が“赤”なのを見ると、無意識に心拍数が上がる。"
        ],
        strengths_weaknesses: {
            strong: "プロジェクト全体を俯瞰し、タスクを効率的に管理・実行する卓越した遂行能力。",
            weak: "ルールや手順から外れることを極端に嫌い、メンバーの個別の事情への配慮が欠けがち。"
        },
        skill: "コーチングスキル: 「なぜできないんだ」と詰めるのではなく、「どうすればできるか」を一緒に考える指導法。",
        workstyle: "遅延プロジェクトの立て直しや、多数の施設を管理する大規模グローバル試験でリーダーシップを発揮します。",
        career_path: "プロジェクトリーダーやラインマネージャーなど、組織と成果の両輪を動かすポジションが向いています。"
    },
    "実行型タスク重視構造型抽象思考": { 
        name: "チームを率いるカリスマ将軍",
        image: "将軍イーグル.png",
        catchphrase: "「ビジョンを示し、最短距離でゴールへ導く」タイプ",
        persona: "将軍イーグル",
        description: `「このやり方は古い。全部変えよう」の一声で、チームに革命をもたらすリーダー。長期的なビジョンを描き、そこから逆算して最も合理的な戦略を立て、チームを牽引します。その揺るぎない自信と決断力に、気づけば誰もが従っています。あなたが関わるプロジェクトは、常に明確なゴールに向かってスピーディに進みます。`,
        aruaru: [
            "「このやり方は古い。来月から全部変えましょう」と、チームを震撼させる大胆な提案を突然する。",
            "気づいたら、自分がリーダーではないはずの会議でもファシリテーター役をやっている。",
            "監査が入ると聞いても、「準備すればいいだけですよね？ビビる意味が分かりません」と豪語する。"
        ],
        strengths_weaknesses: {
            strong: "高い目標を掲げてチームを牽引するリーダーシップと、困難な状況でも合理的な判断を下せる決断力。",
            weak: "自分の考えが絶対だと信じ、他者の意見を聞き入れないことがある。結果を急ぐあまりプロセスを軽視しがち。"
        },
        skill: "傾聴力: チームメンバーの意見や現場の声を最後まで聞き、多様な視点を取り入れる姿勢。",
        workstyle: "治験立ち上げ期や、新しい治験手法（RBM、DCTなど）の導入時に真価を発揮します。複数施設を統括し、チームを方向づけるリーダー役に最適です。",
        career_path: "プロジェクトリーダーやラインマネージャーとして活躍後、開発企画やグローバル戦略部門で組織変革を推進できるポテンシャルを持っています。"
    },
    "実行型タスク重視適応型具体思考": { 
        name: "治験現場の切り込み隊長",
        image: "突撃チーター.png",
        catchphrase: "「行動で道を切り拓く、実践的ネゴシエーター」タイプ",
        persona: "突撃チーター",
        description: `メールで1週間かかる交渉も、あなたが直接乗り込めば1時間で終わる。その圧倒的な行動力と突破力で、数々の難局を乗り越えてきた実践派。「考える前に電話」がモットーで、目の前の具体的な問題を解決することに長けています。計画よりも、その場の状況判断と行動で結果を出す、まさに現場のスペシャリストです。`,
        aruaru: [
            "難航している契約交渉に「私が行ってきます」と乗り込み、なぜか話をまとめて帰ってくる。",
            "依頼者からのQA回答が遅い時、直接電話して施設との板挟み状況を打開する。",
            "「とりあえずやってみましょう！」で動き出すが、後から計画の甘さに気づく。"
        ],
        strengths_weaknesses: {
            strong: "圧倒的な行動力と交渉力。困難な状況でも物怖じせず、その場で問題を解決する力。",
            weak: "計画性に欠け、準備不足のまま行動してしまう。細かい文書レビューや事務作業が苦手。"
        },
        skill: "計画立案能力: 行動する前に「目的・目標・手順」を書き出す習慣をつけること。",
        workstyle: "遅延プロジェクトの立て直しや、施設立ち上げの初動対応など、スピードと現場感が求められる場面で真価を発揮します。",
        career_path: "現場の最前線で活躍するトラブルシューターや、その行動力を活かせる事業開発（BD）部門やアライアンスマネジメントへのキャリアも有望です。"
    },
    "実行型タスク重視適応型抽象思考": { 
        name: "議論の魔術師",
        image: "発明家モンキー.png",
        catchphrase: "「常識を疑い、新しい可能性を創造する」タイプ",
        persona: "発明家モンキー",
        description: `会議がまとまりかけたその時、「そもそも、この評価項目って臨床現場の課題を捉えてますか？」と本質的な問いを投げかけ、議論を活性化させる天才。既存のルールや常識に挑戦し、新しいアイデアでチームの思考停止を防ぎます。あなたがいる会議は、予定調和では終わらず、常に新しい発見があります。`,
        aruaru: [
            "会議で「そもそも、この治験のデザインって本当に正しいんですか？」と根本的な問いを投げかけて議論を白熱させる。",
            "いろんなことに興味が湧き、CRA業務以外の社内プロジェクトにも首を突っ込みがち。",
            "ルーティンワークを「退屈な作業」と呼び、どうにかして自動化または後輩に任せようと画策する。"
        ],
        strengths_weaknesses: {
            strong: "常識にとらわれない発想力と、議論を通じて問題の本質を突く力。",
            weak: "アイデアを出すだけで満足し、実行が伴わないことがある。ルールや手順を軽視しがち。"
        },
        skill: "実行力と完遂力: アイデアを実現可能なタスクに分解し、最後までやり遂げるためのパートナーを見つけること。",
        workstyle: "被験者登録推進のためのエントリー促進策アイデア出しや、施設選定・適格性評価での実行可能性議論で真価を発揮します。",
        career_path: "開発戦略やマーケティングなど、上流工程の企画職や、社外のコンサルタントも視野に入ります。"
    },
    "実行型人間関係重視構造型具体思考": { 
        name: "チームの頼れるアニキ／アネキ",
        image: "社交家ペンギン.png",
        catchphrase: "「人を支え、組織を動かし、結果を出す」タイプ",
        persona: "社交家ペンギン",
        description: `チームの雰囲気を明るく保ちながら、現場を着実に動かすバランサー。困っているCRCや後輩CRAに自然と声をかけ、具体的なサポートで助けるのが得意です。人を支えたいという思いやりと、計画通りに物事を進めたいという責任感を両立させており、チームの調和と成果の両方に貢献する頼れる存在です。`,
        aruaru: [
            "CRCから『○○さんが担当だと安心します』と言われると、心の中でガッツポーズ。",
            "トラブルが起きた施設でも、まず相手の立場を理解してから冷静に対応する。",
            "チームの進捗が遅れていると、自分の業務を整理してでもフォローに回ってしまう。"
        ],
        strengths_weaknesses: {
            strong: "人の感情を読み取りながらも、事実ベースで課題を整理し、チーム全体を前向きに動かす調整力。",
            weak: "人への配慮を優先しすぎて、必要な指摘や是正が遅れがちになることがある。"
        },
        skill: "アサーティブコミュニケーション: 相手に配慮しつつ、必要な改善点を明確に伝えるスキル。",
        workstyle: "CRCや医師との関係構築が重要な施設、または多くのCRAが関わるプロジェクトで真価を発揮します。",
        career_path: "教育担当CRA、リードCRA、または人事・研修部門で“人を動かし、育てる”ポジションに最適です。"
    },
    "実行型人間関係重視構造型抽象思考": { 
        name: "現場を鼓舞するリーダー",
        image: "群れを率いるオオカミ.png",
        catchphrase: "「ビジョンで人を魅了し、チームを導く」タイプ",
        persona: "群れを率いるオオカミ",
        description: `「この治験を成功させたい」という強い信念で、医師やCRC、社内メンバーを巻き込みながら前に進めるリーダー。治験の持つ可能性やビジョンを熱く語り、人々の心を動かします。トラブルが起きても「ここから立て直しましょう！」と誰よりも早く動き、チームを鼓舞する、まさに群れを率いる存在です。`,
        aruaru: [
            "進捗会議で『ここが正念場です。今こそチームで力を合わせましょう！』と自然に熱くなってしまう。",
            "CRCや医師のモチベーションを上げる言葉がけが得意。",
            "自分の担当施設でデータの遅延が出ると、夜でも改善策を考えてしまう。"
        ],
        strengths_weaknesses: {
            strong: "周囲を巻き込み、チーム全体を前向きに動かす力。ビジョンを語り、人を鼓舞するリーダーシップ。",
            weak: "情熱が強すぎて、周囲のペースを見落とすことがある。時に『熱量で押しすぎた』と反省する場面も。"
        },
        skill: "バランスリーダーシップ：熱意に加え、相手の状況を観察して“動かす力と支える力”を使い分ける練習。",
        workstyle: "新規立ち上げ施設や、進捗が停滞しているプロジェクトで力を発揮。モチベーションを高めながら確実に成果を出せます。",
        career_path: "プロジェクトリーダーCRA、リードCRA、または教育・組織開発担当として、人とチームを育てるポジションに最適。"
    },
    "実行型人間関係重視適応型具体思考": { 
        name: "治験チームの太陽",
        image: "ムードメーカー・アシカ.png",
        catchphrase: "「その場の空気と人を楽しませる天才」タイプ",
        persona: "ムードメーカー・アシカ",
        description: `あなたがいるだけで、なぜか現場が明るくなるムードメーカー。その場の空気を読んで人を楽しませることが得意で、初対面の相手ともすぐに打ち解けます。出張先の美味しいお店のリサーチは誰よりも早く、その明るい話題が、緊張した場の空気を一瞬で和ませます。フットワークの軽さと行動力で、現場を盛り上げます。`,
        aruaru: [
            "訪問先でCRCと盛り上がり、気づいたらランチを一緒に食べている。",
            "出張で貯めたマイルとポイントを駆使して、次の海外旅行の計画を立てるのが至福の時。",
            "SUMでプロジェクターが反応しないトラブルが起きても、笑顔と明るさで乗り切る。"
        ],
        strengths_weaknesses: {
            strong: "場の雰囲気を明るくし、初対面の人ともすぐに打ち解ける抜群の社交性とフットワークの軽さ。",
            weak: "計画的な準備や地道な作業が苦手。楽しさを優先して、重要な確認事項を忘れることがある。"
        },
        skill: "セルフマネジメント: モニタリング前にチェックリストを作成し、必須の確認項目を漏らさない仕組み作り。",
        workstyle: "多くの施設や人と関わる大規模試験や、Investigators Meetingなどのイベント企画・運営で持ち前の明るさを発揮できます。",
        career_path: "その卓越したコミュニケーション能力を活かし、患者リクルートメント戦略の立案や、治験の意義を伝える広報・メディカルアフェアーズなど、『人と人をつなぐ』役割で活躍する道も拓けています。"
    },
    "実行型人間関係重視適応型抽象思考": { 
        name: "治験界の自由な風雲児",
        image: "冒険家モモンガ.png",
        catchphrase: "「情熱と好奇心で新しい風を吹き込む」タイプ",
        persona: "冒険家モモンガ",
        description: `「この治験、めっちゃ面白そう！」と直感で飛び込み、誰も思いつかないアイデアで現場を動かす冒険家。新しい施設の開拓や斬新なリクルートメント施策で、チームにワクワクを届けます。あなたの予測不能なエネルギーと共感力は、治験の可能性を広げ、みんなを「次は何するんだ？」と期待させる原動力です。`,
        aruaru: [
            "新規施設の初訪問で、CRCと30分で意気投合し、『このCRAならやってみたい！』と言われる。",
            "患者リクルートメントの会議で『SNSでバズるキャンペーンやっちゃいましょう！』と提案し、チームを驚かせる。",
            "モニタリング訪問時のCRCとの雑談から患者の隠れたニーズをキャッチし、すぐに新しい施策を提案してしまう。"
        ],
        strengths_weaknesses: {
            strong: "好奇心と共感力で新しい可能性を切り開き、チームや施設を巻き込むエネルギー。",
            weak: "興味が次々に移り、一つのタスクを最後までやり遂げるのが苦手。細かい書類作業を後回しにしがち。"
        },
        skill: "タスク管理能力: 溢れるアイデアを整理し、『今やるべきこと』をチェックリストで優先順位づけする力。",
        workstyle: "新規施設の立ち上げ、患者リクルートメントのクリエイティブ施策、治験の意義を伝える広報活動やイベント企画で真価を発揮します。",
        career_path: "治験立ち上げ専門家（Study Start-up Specialist）、デジタルヘルスなど最先端領域のCRA、患者リクルートメント戦略の企画、または治験の魅力を伝える広報・患者アドボカシー担当として活躍できます。"
    },
};

function renderPage() {
  if (!quizContainerEl) return;
  quizContainerEl.innerHTML = ''; 

  const start = currentPage * questionsPerPage;
  const end = Math.min(start + questionsPerPage, questions.length);
  const pageQuestions = questions.slice(start, end);

  if (progressBarEl) {
    const progress = (start / questions.length) * 100;
    progressBarEl.style.width = `${progress}%`;
  }

  if(questionCounterEl) {
    questionCounterEl.textContent = `質問 ${start + 1} - ${end} / ${questions.length}`;
  }

  pageQuestions.forEach((q, index) => {
    const questionIndex = start + index;
    const questionBlock = document.createElement('div');
    questionBlock.className = 'question-block';
    
    const existingAnswer = answers[questionIndex];

    questionBlock.innerHTML = `
      <p class="question-text">${questionIndex + 1}. ${q.question}</p>
      <div class="options-container">
        <span class="side-label left">${q.options.left}</span>
        <div class="radio-group">
          ${[1, 2, 3, 4, 5, 6, 7].map(i => `
            <div>
              <input type="radio" name="option${questionIndex}" id="q${questionIndex}_option${i}" value="${i}" class="option-radio" ${existingAnswer && existingAnswer.value === i ? 'checked' : ''}>
              <label for="q${questionIndex}_option${i}" class="option-label-radio"></label>
            </div>
          `).join('')}
        </div>
        <span class="side-label right">${q.options.right}</span>
      </div>
    `;
    quizContainerEl.appendChild(questionBlock);
  });

  const totalPages = Math.ceil(questions.length / questionsPerPage);
  if (nextBtn) {
    if (currentPage < totalPages - 1) {
      nextBtn.textContent = '次の質問へ';
    } else {
      nextBtn.textContent = '結果を見る';
    }
    nextBtn.classList.remove('hidden');
  }

  if (prevBtn) {
    prevBtn.classList.toggle('hidden', currentPage === 0);
  }
}

function goToPrevPage() {
  if (currentPage > 0) {
    currentPage--;
    renderPage();
    window.scrollTo(0, 0);
  }
}

function goToNextPage() {
  const start = currentPage * questionsPerPage;
  const end = Math.min(start + questionsPerPage, questions.length);

  for (let i = start; i < end; i++) {
    if (!answers[i]) {
      alert(`質問 ${i + 1} に回答してください。`);
      return;
    }
  }

  currentPage++;
  const totalPages = Math.ceil(questions.length / questionsPerPage);

  if (currentPage < totalPages) {
    renderPage();
    window.scrollTo(0, 0);
  } else {
    if (progressBarEl) {
        progressBarEl.style.width = '100%';
    }
    showResult();
  }
}

function showResult() {
  const headerEl = document.querySelector('.header');
  if (headerEl) headerEl.style.display = 'none';
  if (quizContainerEl) quizContainerEl.style.display = 'none';
  if (questionCounterEl) questionCounterEl.style.display = 'none';
  if (document.querySelector('.navigation-buttons')) {
      document.querySelector('.navigation-buttons').style.display = 'none';
  }
  if (progressContainerEl) progressContainerEl.style.display = 'none';

  const scores = {};
  const counts = {};

  answers.filter(ans => ans).forEach(ans => {
    if (!scores[ans.axis]) {
      scores[ans.axis] = 0;
      counts[ans.axis] = 0;
    }
    scores[ans.axis] += ans.value;
    counts[ans.axis]++;
  });

  const summary = {};
  const percentages = {};

  for (const axis in scores) {
    const average = scores[axis] / counts[axis];
    const choice = average <= 4 ? axisValues[axis].left : axisValues[axis].right;
    summary[axis] = choice;

    const rightLeaningScore = scores[axis] - counts[axis];
    const totalRange = 6 * counts[axis];
    const percentRight = Math.round((rightLeaningScore / totalRange) * 100);
    const percentLeft = 100 - percentRight;
    percentages[axis] = { left: percentLeft, right: percentRight };
  }

  const action = summary.action || "分析型";
  const focus = summary.focus || "タスク重視";
  const structure = summary.structure || "構造型";
  const thinking = summary.thinking || "具体思考";

  const typeKey = `${action}${focus}${structure}${thinking}`;
  const type = typeMap[typeKey];

  if (!type) {
    if(resultEl) {
        resultEl.innerHTML = `<h2>診断結果の取得に失敗しました。</h2><p>回答が不足している可能性があります。最初からやり直してください。(デバッグ情報: ${typeKey})</p>`;
        resultEl.classList.remove('hidden');
    }
    console.error("Type not found for key:", typeKey);
    return;
  }

  if(resultEl) {
    document.getElementById('result-image').src = type.image;
    document.getElementById('result-image').alt = type.name;
    document.getElementById('result-persona').textContent = type.persona;
    document.getElementById('result-name').textContent =  type.name;
    document.getElementById('result-catchphrase').textContent = type.catchphrase;
    document.getElementById('result-description').textContent = type.description;
    document.getElementById('result-skill').textContent = type.skill;
    document.getElementById('result-workstyle').textContent = type.workstyle;
    document.getElementById('result-career_path').innerHTML = type.career_path.replace(/\n/g, '<br>');

    const percentagesEl = document.getElementById('result-percentages');
    percentagesEl.innerHTML = '';
    const axesOrder = ['action', 'focus', 'structure', 'thinking'];
    axesOrder.forEach(axis => {
        if (percentages[axis]) {
        const axisInfo = axisValues[axis];
        const axisPercentages = percentages[axis];
        percentagesEl.innerHTML += `
            <div class="percentage-item">
            <div class="percentage-labels">
                <span class="label-left">${axisInfo.left} (${axisPercentages.left}%)</span>
                <span class="label-right">${axisInfo.right} (${axisPercentages.right}%)</span>
            </div>
            <div class="percentage-bar-container" style="--right-percent: ${axisPercentages.right}%"></div>
            </div>`;
        }
    });

    document.getElementById('result-aruaru').innerHTML = type.aruaru.map(item => `<li>${item}</li>`).join('');
    
    document.getElementById('result-strengths-weaknesses').innerHTML = `
        <div class="sw-grid">
            <div class="sw-item sw-strong"><h4><span class="sw-icon">👍</span> 強み</h4><p>${type.strengths_weaknesses.strong}</p></div>
            <div class="sw-item sw-weak"><h4><span class="sw-icon">👎</span> 弱み</h4><p>${type.strengths_weaknesses.weak}</p></div>
        </div>`;

    const shareText = `私のCRA性格診断の結果は【${type.persona}】でした！\n\n${type.catchphrase}\n\nあなたも診断してみよう！\n#CRA性格診断`;
    const pageUrl = window.location.href;
    const shareXBtn = document.getElementById('share-x-btn');
    shareXBtn.href = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(pageUrl)}`;
    
    const shareCopyBtn = document.getElementById('share-copy-btn');
    shareCopyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(shareText + '\n\n' + pageUrl).then(() => {
        const originalText = shareCopyBtn.textContent;
        shareCopyBtn.textContent = 'コピーしました！';
        setTimeout(() => { shareCopyBtn.textContent = originalText; }, 2000);
      }).catch(err => { console.error('コピーに失敗しました', err); alert('コピーに失敗しました。'); });
    });

    resultEl.classList.remove('hidden');
    window.scrollTo(0, 0);

    setupFeedbackSystem(typeKey, type.name); 
  }
}

if (nextBtn) nextBtn.addEventListener('click', goToNextPage);
if (prevBtn) prevBtn.addEventListener('click', goToPrevPage);

if (quizContainerEl) {
    quizContainerEl.addEventListener('change', (event) => {
        const target = event.target;
        if (target.type === 'radio' && target.name.startsWith('option')) {
            const questionIndex = parseInt(target.name.replace('option', ''), 10);
            const value = parseInt(target.value, 10);
            if (!isNaN(questionIndex) && !isNaN(value) && questions[questionIndex]) {
                answers[questionIndex] = { axis: questions[questionIndex].axis, value: value };
            }
        }
    });
}

function initializePage() {
  if (document.getElementById('quiz-container')) renderPage();
  
  const characterListContainer = document.getElementById('character-list');
  if (characterListContainer) {
      Object.keys(typeMap).sort((a, b) => typeMap[a].persona.localeCompare(typeMap[b].persona, 'ja')).forEach(key => {
          const type = typeMap[key];
          const cardLink = document.createElement('a');
          cardLink.className = 'character-card';
          cardLink.href = `character-detail.html?type=${encodeURIComponent(key)}`;
          cardLink.style.backgroundImage = `url('${type.image}')`;
          cardLink.innerHTML = `<div class="character-card-overlay"><h3 class="character-card-persona">${type.persona}</h3><p class="character-card-name">${type.name}</p><p class="character-card-catchphrase">“${type.catchphrase}”</p></div>`;
          characterListContainer.appendChild(cardLink);
      });
  }
  
  const detailContainer = document.getElementById('character-detail-container');
  if (detailContainer) {
    const typeKey = new URLSearchParams(window.location.search).get('type');
    if (typeKey && typeMap[typeKey]) {
      const type = typeMap[typeKey];
      document.title = `${type.persona}（${type.name}）- キャラクター詳細`;
      document.getElementById('detail-image').src = type.image;
      document.getElementById('detail-image').alt = type.name;
      document.getElementById('detail-persona').textContent = type.persona;
      document.getElementById('detail-name').textContent = type.name;
      document.getElementById('detail-catchphrase').textContent = type.catchphrase;
      document.getElementById('detail-description').textContent = type.description;
      document.getElementById('detail-skill').textContent = type.skill;
      document.getElementById('detail-workstyle').textContent = type.workstyle;
      document.getElementById('detail-career_path').innerHTML = type.career_path.replace(/\n/g, '<br>');
      document.getElementById('detail-aruaru').innerHTML = type.aruaru.map(item => `<li>${item}</li>`).join('');
      document.getElementById('detail-strengths-weaknesses').innerHTML = `<div class="sw-grid"><div class="sw-item sw-strong"><h4><span class="sw-icon">👍</span> 強み</h4><p>${type.strengths_weaknesses.strong}</p></div><div class="sw-item sw-weak"><h4><span class="sw-icon">👎</span> 弱み</h4><p>${type.strengths_weaknesses.weak}</p></div></div>`;
    } else {
      detailContainer.innerHTML = '<h2>キャラクターが見つかりません</h2><p>指定されたキャラクターの情報が見つかりませんでした。</p>';
    }
  }
}
initializePage();

function setupHamburgerMenu() {
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const closeBtn = document.getElementById('close-btn');
    if (hamburgerBtn && mobileMenu && closeBtn) {
        hamburgerBtn.addEventListener('click', () => mobileMenu.classList.add('is-open'));
        closeBtn.addEventListener('click', () => mobileMenu.classList.remove('is-open'));
        mobileMenu.addEventListener('click', (event) => { if (event.target === mobileMenu) mobileMenu.classList.remove('is-open'); });
    }
}
document.addEventListener('DOMContentLoaded', setupHamburgerMenu);

function setupFeedbackSystem(typeKey, typeName) {
  const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSecKqos9rgzfbR_uVPMdz1twOa2T9CxLkb-CPt1oternNNGBg/formResponse';
  const TYPE_ENTRY_ID = 'entry.147532404';
  const RATING_ENTRY_ID = 'entry.1601623528';
  const COMMENT_ENTRY_ID = 'entry.886476569';

  const ratingButtons = document.querySelectorAll('.feedback-rating-btn');
  const commentTextarea = document.getElementById('feedback-comment');
  const submitButton = document.getElementById('feedback-submit-btn');
  const thanksMessage = document.getElementById('feedback-thanks');
  const feedbackForm = document.getElementById('feedback-form');

  if (!feedbackForm) return;

  let selectedRating = null;

  ratingButtons.forEach(button => {
    button.addEventListener('click', () => {
      ratingButtons.forEach(btn => btn.classList.remove('selected'));
      button.classList.add('selected');
      selectedRating = button.dataset.value;
    });
  });

  submitButton.addEventListener('click', async () => {
    if (!selectedRating) {
      alert('診断結果の納得度を選択してください。');
      return;
    }
    
    const formData = new FormData();
    formData.append(TYPE_ENTRY_ID, `${typeKey} (${typeName})`);
    formData.append(RATING_ENTRY_ID, selectedRating);
    formData.append(COMMENT_ENTRY_ID, commentTextarea.value);

    submitButton.disabled = true;
    submitButton.textContent = '送信中...';

    try {
      await fetch(GOOGLE_FORM_URL, { method: 'POST', mode: 'no-cors', body: formData });
      feedbackForm.style.display = 'none';
      thanksMessage.classList.remove('hidden');
    } catch (error) {
      console.error('フィードバックの送信に失敗しました:', error);
      alert('エラーが発生しました。フィードバックを送信できませんでした。');
      submitButton.disabled = false;
      submitButton.textContent = 'フィードバックを送信する';
    }
  });
}