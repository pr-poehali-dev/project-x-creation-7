import { useState } from "react"
import Icon from "@/components/ui/icon"
import { GrainOverlay } from "@/components/grain-overlay"
import { CustomCursor } from "@/components/custom-cursor"
import { Shader, ChromaFlow, Swirl } from "shaders/react"

const STORIES = [
  { id: 1, name: "Моя", avatar: "М", color: "from-primary to-accent", isOwn: true, seen: false },
  { id: 2, name: "Алина", avatar: "А", color: "from-pink-500 to-rose-400", seen: false },
  { id: 3, name: "Денис", avatar: "Д", color: "from-cyan-400 to-primary", seen: false },
  { id: 4, name: "Команда", avatar: "К", color: "from-green-400 to-emerald-500", seen: true },
  { id: 5, name: "Максим", avatar: "М", color: "from-orange-400 to-amber-400", seen: true },
  { id: 6, name: "Юля", avatar: "Ю", color: "from-accent to-purple-600", seen: false },
  { id: 7, name: "Работа", avatar: "Р", color: "from-sky-400 to-cyan-400", seen: true },
]

const CHATS = [
  {
    id: 1,
    name: "Алина Смирнова",
    avatar: "А",
    color: "from-pink-500 to-rose-400",
    lastMessage: "Окей, встречаемся в 19:00 у метро 👍",
    time: "сейчас",
    unread: 2,
    online: true,
    pinned: true,
  },
  {
    id: 2,
    name: "Команда Mesh",
    avatar: "М",
    color: "from-primary to-cyan-400",
    lastMessage: "Денис: Новый билд готов к тестированию!",
    time: "3 мин",
    unread: 14,
    online: false,
    isGroup: true,
    pinned: true,
  },
  {
    id: 3,
    name: "Денис Волков",
    avatar: "Д",
    color: "from-cyan-400 to-primary",
    lastMessage: "Ты смотрел новый фильм?",
    time: "15 мин",
    unread: 0,
    online: true,
  },
  {
    id: 4,
    name: "Максим К.",
    avatar: "М",
    color: "from-orange-400 to-amber-400",
    lastMessage: "Отправил документы на почту",
    time: "1 ч",
    unread: 0,
    online: false,
  },
  {
    id: 5,
    name: "Разработка iOS",
    avatar: "iOS",
    color: "from-foreground/20 to-foreground/10",
    lastMessage: "Ты: Pull request открыт, смотрите",
    time: "2 ч",
    unread: 0,
    online: false,
    isGroup: true,
  },
  {
    id: 6,
    name: "Юлия Петрова",
    avatar: "Ю",
    color: "from-accent to-purple-600",
    lastMessage: "Спасибо большое! ❤️",
    time: "вчера",
    unread: 0,
    online: false,
  },
  {
    id: 7,
    name: "Новости Tech",
    avatar: "📡",
    color: "from-sky-500 to-primary",
    lastMessage: "Google представила Android 16 с новым дизайном",
    time: "вчера",
    unread: 3,
    online: false,
    isChannel: true,
  },
  {
    id: 8,
    name: "Антон Лебедев",
    avatar: "А",
    color: "from-teal-400 to-green-500",
    lastMessage: "Созвонимся завтра?",
    time: "2 дня",
    unread: 0,
    online: false,
  },
  {
    id: 9,
    name: "Семья",
    avatar: "👨‍👩‍👧",
    color: "from-yellow-400 to-orange-400",
    lastMessage: "Мама: Приходи на ужин в субботу",
    time: "2 дня",
    unread: 1,
    online: false,
    isGroup: true,
  },
]

function ShaderBg() {
  return (
    <div className="fixed inset-0 z-0" style={{ contain: "strict" }}>
      <Shader className="h-full w-full">
        <Swirl
          colorA="#2AABEE"
          colorB="#7B61FF"
          speed={0.5}
          detail={0.9}
          blend={55}
          coarseX={35}
          coarseY={35}
          mediumX={45}
          mediumY={45}
          fineX={30}
          fineY={30}
        />
        <ChromaFlow
          baseColor="#2AABEE"
          upColor="#2AABEE"
          downColor="#050505"
          leftColor="#7B61FF"
          rightColor="#5B8DEF"
          intensity={0.75}
          radius={1.6}
          momentum={20}
          maskType="alpha"
          opacity={0.95}
        />
      </Shader>
      <div className="absolute inset-0 bg-background/75" />
    </div>
  )
}

export default function Messenger() {
  const [activeTab, setActiveTab] = useState<"chats" | "calls" | "contacts" | "settings">("chats")
  const [searchQuery, setSearchQuery] = useState("")
  const [activeStory, setActiveStory] = useState<number | null>(null)
  const [activeChat, setActiveChat] = useState<number | null>(null)

  const filteredChats = CHATS.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  )
  const totalUnread = CHATS.reduce((sum, c) => sum + c.unread, 0)

  if (activeChat !== null) {
    const chat = CHATS.find((c) => c.id === activeChat)!
    return <ChatView chat={chat} onBack={() => setActiveChat(null)} />
  }

  return (
    <main className="relative h-screen w-full overflow-hidden bg-background">
      <CustomCursor />
      <GrainOverlay />
      <ShaderBg />

      <div className="relative z-10 flex h-screen flex-col overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-14 pb-4" role="banner">
          <div>
            <p className="font-mono text-xs text-foreground/50">/ мессенджер</p>
            <h1 className="font-sans text-2xl font-light tracking-tight text-foreground">Чаты</h1>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex h-9 w-9 items-center justify-center rounded-full border border-foreground/10 bg-foreground/5 backdrop-blur-md transition-all hover:bg-foreground/10">
              <Icon name="Search" size={16} />
            </button>
            <button className="flex h-9 w-9 items-center justify-center rounded-full border border-foreground/10 bg-foreground/5 backdrop-blur-md transition-all hover:bg-foreground/10">
              <Icon name="Edit3" size={16} />
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="px-6 pb-4">
          <div className="flex items-center gap-3 rounded-full border border-foreground/10 bg-foreground/5 px-4 py-2.5 backdrop-blur-md">
            <Icon name="Search" size={14} className="text-foreground/40" />
            <input
              className="flex-1 bg-transparent font-sans text-sm text-foreground placeholder:text-foreground/40 focus:outline-none"
              placeholder="Поиск по чатам..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery("")}>
                <Icon name="X" size={14} className="text-foreground/40" />
              </button>
            )}
          </div>
        </div>

        {/* Stories */}
        {!searchQuery && (
          <div className="flex gap-3 overflow-x-auto px-6 pb-5" style={{ scrollbarWidth: "none" }}>
            {STORIES.map((story) => (
              <button
                key={story.id}
                onClick={() => setActiveStory(story.id)}
                className="group flex shrink-0 flex-col items-center gap-2"
              >
                <div
                  className={`relative h-14 w-14 rounded-2xl p-[2px] transition-transform duration-300 group-hover:scale-105 ${
                    story.seen ? "bg-foreground/15" : `bg-gradient-to-br ${story.color}`
                  }`}
                >
                  <div className="flex h-full w-full items-center justify-center rounded-[14px] bg-card backdrop-blur-sm">
                    {story.isOwn ? (
                      <div className="relative flex h-full w-full items-center justify-center rounded-[14px] bg-gradient-to-br from-primary to-accent">
                        <span className="font-sans text-sm font-semibold text-primary-foreground">М</span>
                        <div className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full border border-background bg-primary">
                          <Icon name="Plus" size={8} />
                        </div>
                      </div>
                    ) : (
                      <span className="font-sans text-sm font-light text-foreground">{story.avatar}</span>
                    )}
                  </div>
                </div>
                <span className="font-mono text-[9px] text-foreground/50">{story.name}</span>
              </button>
            ))}
          </div>
        )}

        {/* Divider */}
        {!searchQuery && (
          <div className="flex items-center gap-3 px-6 pb-3">
            <div className="h-px flex-1 bg-foreground/10" />
            <span className="font-mono text-[10px] uppercase tracking-widest text-foreground/30">закреплённые</span>
            <div className="h-px flex-1 bg-foreground/10" />
          </div>
        )}

        {/* Chat list */}
        <div className="flex-1 overflow-y-auto px-4" style={{ scrollbarWidth: "none" }}>
          {filteredChats.map((chat, idx) => {
            const firstUnpinned = !searchQuery && CHATS.findIndex((c) => !c.pinned) === idx
            return (
              <div key={chat.id}>
                {firstUnpinned && (
                  <div className="flex items-center gap-3 py-3">
                    <div className="h-px flex-1 bg-foreground/10" />
                    <span className="font-mono text-[10px] uppercase tracking-widest text-foreground/30">все чаты</span>
                    <div className="h-px flex-1 bg-foreground/10" />
                  </div>
                )}
                <button
                  onClick={() => setActiveChat(chat.id)}
                  className="group flex w-full items-center gap-4 rounded-2xl px-3 py-3 transition-all duration-300 hover:bg-foreground/5"
                >
                  <div className="relative shrink-0">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${chat.color} font-sans text-sm font-light text-white transition-transform duration-300 group-hover:scale-105`}
                    >
                      {chat.avatar}
                    </div>
                    {chat.online && (
                      <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-background bg-green-400" />
                    )}
                    {chat.isChannel && (
                      <div className="absolute -bottom-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full border border-background bg-primary">
                        <Icon name="Radio" size={7} />
                      </div>
                    )}
                    {chat.isGroup && !chat.isChannel && (
                      <div className="absolute -bottom-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full border border-background bg-accent">
                        <Icon name="Users" size={7} />
                      </div>
                    )}
                  </div>

                  <div className="flex flex-1 flex-col gap-0.5 overflow-hidden text-left">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5 overflow-hidden">
                        {chat.pinned && <Icon name="Pin" size={11} className="shrink-0 rotate-45 text-foreground/25" />}
                        <span className="truncate font-sans text-sm font-medium text-foreground">{chat.name}</span>
                      </div>
                      <span className={`shrink-0 font-mono text-[10px] ${chat.unread > 0 ? "text-primary" : "text-foreground/30"}`}>
                        {chat.time}
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="truncate font-sans text-xs font-light text-foreground/45">{chat.lastMessage}</span>
                      {chat.unread > 0 && (
                        <div className="flex h-4 min-w-4 shrink-0 items-center justify-center rounded-full bg-primary px-1">
                          <span className="font-sans text-[10px] font-semibold text-primary-foreground">{chat.unread}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </button>
              </div>
            )
          })}

          {filteredChats.length === 0 && (
            <div className="flex flex-col items-center gap-3 py-24">
              <Icon name="SearchX" size={36} className="text-foreground/20" />
              <span className="font-mono text-xs text-foreground/30">ничего не найдено</span>
            </div>
          )}
          <div className="h-28" />
        </div>

        {/* Floating pill nav */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
          <div className="flex items-center gap-1 rounded-full border border-foreground/20 bg-foreground/10 p-1.5 backdrop-blur-xl shadow-2xl">
            {[
              { id: "chats", icon: "MessageCircle", label: "Чаты", badge: totalUnread },
              { id: "calls", icon: "Phone", label: "Звонки" },
              { id: "contacts", icon: "Users", label: "Контакты" },
              { id: "settings", icon: "Settings2", label: "Настройки" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`group relative flex items-center gap-2 rounded-full px-4 py-2 transition-all duration-300 ${
                  activeTab === tab.id
                    ? "bg-foreground/15 text-foreground"
                    : "text-foreground/40 hover:text-foreground/70"
                }`}
              >
                <Icon name={tab.icon} size={18} />
                {activeTab === tab.id && (
                  <span className="font-mono text-[11px] text-foreground/80">{tab.label}</span>
                )}
                {tab.badge && tab.badge > 0 && (
                  <div className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1">
                    <span className="font-sans text-[8px] font-bold text-primary-foreground">{tab.badge > 99 ? "99+" : tab.badge}</span>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Story viewer */}
        {activeStory !== null && (
          <StoryViewer
            story={STORIES.find((s) => s.id === activeStory)!}
            onClose={() => setActiveStory(null)}
          />
        )}
      </div>
    </main>
  )
}

function StoryViewer({ story, onClose }: { story: (typeof STORIES)[0]; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-background" onClick={onClose}>
      <GrainOverlay />
      <div className={`absolute inset-0 bg-gradient-to-br ${story.color} opacity-25`} />

      <div className="relative z-10 flex gap-1 px-4 pt-14">
        {[0, 1, 2].map((i) => (
          <div key={i} className="h-px flex-1 bg-foreground/20">
            <div className="h-full bg-foreground transition-all duration-[5000ms] ease-linear" style={{ width: i === 0 ? "100%" : "0%" }} />
          </div>
        ))}
      </div>

      <div className="relative z-10 flex items-center gap-3 px-4 py-4" onClick={(e) => e.stopPropagation()}>
        <div className={`flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br ${story.color} font-sans text-sm font-light text-white`}>
          {story.avatar}
        </div>
        <div>
          <div className="font-sans text-sm font-medium text-foreground">{story.name}</div>
          <div className="font-mono text-xs text-foreground/50">только что</div>
        </div>
        <button className="ml-auto text-foreground/60 transition-colors hover:text-foreground" onClick={onClose}>
          <Icon name="X" size={20} />
        </button>
      </div>

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center">
        <span className="font-sans text-9xl font-light text-foreground/10">{story.avatar}</span>
      </div>

      <div className="relative z-10 flex items-center gap-3 p-4 pb-12" onClick={(e) => e.stopPropagation()}>
        <input
          className="flex-1 rounded-full border border-foreground/15 bg-foreground/8 px-5 py-3 font-sans text-sm text-foreground placeholder:text-foreground/40 backdrop-blur-md focus:outline-none"
          placeholder={`Ответить ${story.name.split(" ")[0]}...`}
        />
        <button className="flex h-11 w-11 items-center justify-center rounded-full border border-foreground/10 bg-foreground/10 backdrop-blur-md transition-all hover:bg-foreground/20">
          <Icon name="Send" size={16} />
        </button>
      </div>
    </div>
  )
}

function ChatView({ chat, onBack }: { chat: (typeof CHATS)[0]; onBack: () => void }) {
  const [message, setMessage] = useState("")

  const messages = [
    { id: 1, text: "Привет! Как дела?", mine: false, time: "18:42" },
    { id: 2, text: "Всё отлично, спасибо! Ты как?", mine: true, time: "18:43", read: true },
    { id: 3, text: "Тоже хорошо 😊 Слушай, ты свободен сегодня вечером?", mine: false, time: "18:44" },
    { id: 4, text: "Да, в принципе свободен. А что случилось?", mine: true, time: "18:45", read: true },
    { id: 5, text: "Хотела предложить сходить в кино или просто погулять", mine: false, time: "18:46" },
    { id: 6, text: "Звучит отлично! Давай в 19:00 у метро?", mine: true, time: "18:47", read: true },
    { id: 7, text: "Окей, встречаемся в 19:00 у метро 👍", mine: false, time: "18:48" },
  ]

  return (
    <main className="relative h-screen w-full overflow-hidden bg-background">
      <CustomCursor />
      <GrainOverlay />
      <ShaderBg />

      <div className="relative z-10 flex h-screen flex-col text-foreground">
        {/* Chat header */}
        <div className="flex items-center gap-3 border-b border-foreground/10 px-4 pb-4 pt-14">
          <button onClick={onBack} className="flex h-9 w-9 items-center justify-center rounded-full border border-foreground/10 bg-foreground/5 transition-all hover:bg-foreground/10">
            <Icon name="ChevronLeft" size={18} />
          </button>
          <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${chat.color} font-sans text-sm font-light text-white`}>
            {chat.avatar}
          </div>
          <div className="flex-1 overflow-hidden">
            <div className="truncate font-sans text-sm font-medium text-foreground">{chat.name}</div>
            <div className="font-mono text-[10px] text-foreground/40">
              {chat.online ? "в сети" : chat.isGroup ? "4 участника" : "был(а) недавно"}
            </div>
          </div>
          <div className="flex gap-1">
            <button className="flex h-9 w-9 items-center justify-center rounded-full border border-foreground/10 bg-foreground/5 transition-all hover:bg-foreground/10">
              <Icon name="Phone" size={16} />
            </button>
            <button className="flex h-9 w-9 items-center justify-center rounded-full border border-foreground/10 bg-foreground/5 transition-all hover:bg-foreground/10">
              <Icon name="MoreVertical" size={16} />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-6 space-y-2" style={{ scrollbarWidth: "none" }}>
          <div className="flex justify-center mb-6">
            <span className="rounded-full border border-foreground/10 bg-foreground/5 px-4 py-1 font-mono text-[10px] uppercase tracking-widest text-foreground/40 backdrop-blur-md">
              сегодня
            </span>
          </div>

          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.mine ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[72%] rounded-2xl px-4 py-3 ${
                  msg.mine
                    ? "rounded-br-sm bg-gradient-to-br from-primary to-accent/70 text-primary-foreground"
                    : "rounded-bl-sm border border-foreground/10 bg-foreground/8 text-foreground backdrop-blur-md"
                }`}
              >
                <p className="font-sans text-sm font-light leading-relaxed">{msg.text}</p>
                <div className={`mt-1 flex items-center gap-1 ${msg.mine ? "justify-end" : "justify-start"}`}>
                  <span className="font-mono text-[9px] opacity-50">{msg.time}</span>
                  {msg.mine && <Icon name="CheckCheck" size={11} className={msg.read ? "opacity-80" : "opacity-30"} />}
                </div>
              </div>
            </div>
          ))}
          <div className="h-4" />
        </div>

        {/* Input */}
        <div className="flex items-end gap-2 border-t border-foreground/10 px-4 pb-10 pt-3">
          <button className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-foreground/10 bg-foreground/5 transition-all hover:bg-foreground/10">
            <Icon name="Paperclip" size={16} className="text-foreground/50" />
          </button>
          <div className="flex flex-1 items-end rounded-2xl border border-foreground/10 bg-foreground/5 px-4 py-3 backdrop-blur-md">
            <textarea
              rows={1}
              className="flex-1 resize-none bg-transparent font-sans text-sm font-light text-foreground placeholder:text-foreground/35 focus:outline-none"
              placeholder="Сообщение..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              style={{ maxHeight: "100px" }}
            />
            <button className="ml-2 shrink-0 text-foreground/40 transition-colors hover:text-foreground/70">
              <Icon name="Smile" size={18} />
            </button>
          </div>
          <button className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-foreground/90 text-background transition-all hover:scale-105 hover:bg-foreground active:scale-95">
            <Icon name={message.trim() ? "Send" : "Mic"} size={16} />
          </button>
        </div>
      </div>
    </main>
  )
}