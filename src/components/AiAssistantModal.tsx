import React, { useState } from 'react';
import { X, Sparkles, Send, ArrowRight } from 'lucide-react';

interface AiAssistantModalProps {
  onClose: () => void;
}

interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  time: string;
}

export const AiAssistantModal: React.FC<AiAssistantModalProps> = ({ onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'ai',
      text: '乡亲你好！我是您的「水头通·AI 乡情助手」。无论是想打听水头本土美食、老街今昔变迁、皮都产业资讯，还是想学两句地道水头温州话，随时问我！',
      time: '刚才',
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const quickPrompts = [
    '水头有哪些必吃地道特色小吃？',
    '水头“中国皮都”有哪些拳头产品？',
    '教我两句水头温州话老古话！',
    '从温州高铁站如何快速坐车到水头？',
    '帮我写一段水头游子思乡老照片文案',
  ];

  const getKnowledgeResponse = (query: string): string => {
    const q = query.toLowerCase();
    if (q.includes('吃') || q.includes('美食') || q.includes('特产') || q.includes('小吃') || q.includes('排骨')) {
      return `【水头地道风味必尝清单】\n1. 水头炸排骨：水头人的味觉图腾！外皮金黄酥脆、蒜香扑鼻，咬开肉汁四溢，配上一碗冰镇红豆汤或炒粉干堪称绝配！\n2. 水头炒粉干：选用本地精细手工粉干，肉丝、香菇、卷心菜旺火爆炒，镬气十足！\n3. 平阳黄汤：产于水头周边朝阳山及南雁荡山一带，为中国传统名茶“三黄”之一，汤色黄亮，清甜润喉。\n4. 南雁土鸡煲 & 麦饼：山野柴火焖制，皮滑肉嫩；麦饼皮薄馅足，肉末梅干菜焦香可口！`;
    }
    if (q.includes('皮') || q.includes('箱包') || q.includes('产业') || q.includes('创业') || q.includes('工厂')) {
      return `【水头“中国皮都”产业概况】\n水头镇素有“中国皮都”美誉，是浙南闽北重要经济重镇与全国最大的皮件生产基地之一：\n• 拳头产品：真皮时尚男女箱包、商务公文包、定制皮带、高端宠物皮革用品。\n• 转型升级：如今的水头大力发展绿色生态智造、跨境电商及自主品牌出海。本镇建有皮革城直销中心和数智电商园，对返乡青年电商主播、板房设计师提供场地免租和落户奖励！`;
    }
    if (q.includes('话') || q.includes('方言') || q.includes('俚语') || q.includes('语言')) {
      return `【地道水头温州话速成】\n• “水头”温州方言发音近于 [Cei-Teu / 垂头音]；\n• “吃过饭没”：‘食过罢没’（qie guo ba va）？这是水头老乡相逢最温暖的问候；\n• “真漂亮/真赞”：‘利市’（li-si）或‘相惬’（xi-qie）；\n• “家里人”：‘屋里侬’（ou-li-nang）；\n• “不用客气”：‘休客气’（xiu kie-qi）。在外地听到这熟悉的乡音，心里立马就暖了！`;
    }
    if (q.includes('车') || q.includes('高铁') || q.includes('交通') || q.includes('客运') || q.includes('轻轨')) {
      return `【游子回乡交通换乘宝典】\n1. 高铁到【鳌江动车站】（距水头约25公里）：出站即有水头专线快客大巴，白天每15-20分钟一班，车程约35分钟直达水头客运中心；夜间出站口也有正规拼车出租。\n2. 飞机到【温州龙湾国际机场】：可乘坐机场大巴或轻轨S1/S2接驳换乘动车至鳌江站，再转大巴至水头；或者直接在网约车平台拼直达水头的定制专线车。`;
    }
    if (q.includes('文案') || q.includes('朋友圈') || q.includes('照片') || q.includes('回忆')) {
      return `【为您定制的乡情文案】\n“走过很多城市的立交桥，最留恋的依然是老家水头的那座跨溪江桥。\n带溪的水清了，老街的路宽了，但记忆里排骨的蒜香和母亲炒粉干的香气从未褪色。\n离家虽远，心却常在。我是水头人，为家乡每一次向上的变迁自豪点赞！”`;
    }

    return `关于您问的“${query}”，作为水头本地AI助手，水头依偎着秀美的南雁荡山与清澈的带溪，人文荟萃、商贸繁荣。如果您想发布招工、打听便民服务或查找商圈团购，也可以直接使用底部对应板块，或者输入具体关键词我来为您解答！`;
  };

  const handleSend = (textToSend?: string) => {
    const q = (textToSend || input).trim();
    if (!q) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: q,
      time: '刚才',
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const reply = getKnowledgeResponse(q);
      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: reply,
        time: '刚刚',
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 animate-in fade-in">
      <div className="bg-white rounded-3xl w-full max-w-lg h-[85vh] flex flex-col overflow-hidden shadow-2xl border border-gray-200">
        {/* Bento Dark Header with #B91C1C Accent */}
        <div className="p-4 bg-[#1A1A1B] text-white flex items-center justify-between border-b border-gray-800 relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-[#B91C1C]" />
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#B91C1C] flex items-center justify-center text-white font-bold">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-sm leading-tight flex items-center gap-1.5">
                水头通 · 智能乡情顾问
                <span className="text-[10px] bg-white/20 text-white font-bold px-1.5 py-0.2 rounded">
                  AI
                </span>
              </div>
              <div className="text-[11px] text-gray-400 mt-0.5">
                平阳水头风土人情 / 皮都产业 / 特色美食百宝箱
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Quick prompt chips */}
        <div className="p-3 bg-[#F8F9FA] border-b border-gray-100 overflow-x-auto flex gap-1.5 no-scrollbar text-xs">
          {quickPrompts.map((p, i) => (
            <button
              key={i}
              onClick={() => handleSend(p)}
              className="px-3 py-1.5 rounded-xl bg-white border border-gray-200 text-[#1A1A1B] hover:border-gray-300 hover:bg-gray-50 whitespace-nowrap text-xs flex items-center gap-1.5 active:scale-95 transition-all shadow-2xs"
            >
              <span>{p}</span>
              <ArrowRight className="w-3 h-3 text-[#B91C1C]" />
            </button>
          ))}
        </div>

        {/* Messages scroll area */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3.5 text-xs">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex gap-2.5 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {m.sender === 'ai' && (
                <div className="w-7 h-7 rounded-xl bg-[#B91C1C] text-white flex items-center justify-center shrink-0 font-bold text-xs shadow-xs">
                  水
                </div>
              )}
              <div
                className={`max-w-[82%] p-3.5 rounded-2xl leading-relaxed whitespace-pre-line ${
                  m.sender === 'user'
                    ? 'bg-[#1A1A1B] text-white rounded-tr-xs shadow-xs'
                    : 'bg-[#F8F9FA] text-[#1A1A1B] rounded-tl-xs border border-gray-200/80 shadow-2xs'
                }`}
              >
                {m.text}
              </div>
              {m.sender === 'user' && (
                <div className="w-7 h-7 rounded-xl bg-[#1A1A1B] text-white flex items-center justify-center shrink-0 font-bold text-xs">
                  我
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-2.5 items-center text-xs text-gray-400">
              <div className="w-7 h-7 rounded-xl bg-[#B91C1C] text-white flex items-center justify-center shrink-0 text-xs font-bold">
                水
              </div>
              <span className="animate-pulse">水头通正在为您组织回答...</span>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-[#F8F9FA] border-t border-gray-200 flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSend();
            }}
            placeholder="问问水头特产、皮件招工、老街记忆或方言..."
            className="flex-1 px-3.5 py-2.5 rounded-2xl bg-white border border-gray-200 text-xs text-[#1A1A1B] focus:outline-none focus:ring-1 focus:ring-[#B91C1C]"
          />
          <button
            onClick={() => handleSend()}
            className="px-4 py-2.5 bg-[#B91C1C] hover:bg-[#991b1b] text-white rounded-xl text-xs font-medium flex items-center gap-1 active:scale-95 shadow-xs transition-all"
          >
            <Send className="w-3.5 h-3.5" />
            发送
          </button>
        </div>
      </div>
    </div>
  );
};
