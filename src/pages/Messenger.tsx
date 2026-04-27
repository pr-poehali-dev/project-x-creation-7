import { useState } from "react"
import Icon from "@/components/ui/icon"

const STORIES = [
  { id: 1, name: "Моя история", avatar: "М", color: "from-blue-500 to-purple-600", isOwn: true, seen: false },
  { id: 2, name: "Алина", avatar: "А", color: "from-pink-500 to-rose-500", seen: false },
  { id: 3, name: "Денис", avatar: "Д", color: "from-cyan-400 to-blue-500", seen: false },
  { id: 4, name: "Команда", avatar: "К", color: "from-green-400 to-emerald-500", seen: true },
  { id: 5, name: "Максим", avatar: "М", color: "from-orange-400 to-amber-500", seen: true },
  { id: 6, name: "Юля", avatar: "Ю", color: "from-violet-500 to-purple-600", seen: false },
  { id: 7, name: "Работа", avatar: "Р", color: "from-sky-400 to-cyan-500", seen: true },
]

const CHATS = [
  {
    id: 1,
    name: "Алина Смирнова",
    avatar: "А",
    color: "from-pink-500 to-rose-500",
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
    color: "from-blue-500 to-cyan-400",
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
    color: "from-cyan-400 to-blue-500",
    lastMessage: "Ты смотрел новый фильм?",
    time: "15 мин",
    unread: 0,
    online: true,
  },
  {
    id: 4,
    name: "Максим К.",
    avatar: "М",
    color: "from-orange-400 to-amber-500",
    lastMessage: "Отправил документы на почту",
    time: "1 ч",
    unread: 0,
    online: false,
  },
  {
    id: 5,
    name: "Разработка iOS",
    avatar: "iOS",
    color: "from-gray-600 to-gray-800",
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
    color: "from-violet-500 to-purple-600",
    lastMessage: "Спасибо большое! ❤️",
    time: "вчера",
    unread: 0,
    online: false,
  },
  {
    id: 7,
    name: "Новости Tech",
    avatar: "📡",
    color: "from-sky-500 to-blue-600",
    lastMessage: "Google представила Android 16 с новым...",
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
    <div className="flex h-screen w-full flex-col bg-[#0e0e0e] text-white overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-12 pb-3 bg-[#0e0e0e]">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#2AABEE] to-[#7B61FF]">
            <span className="text-sm font-bold text-white">M</span>
          </div>
          <span className="text-xl font-semibold tracking-tight">Mesh</span>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex h-9 w-9 items-center justify-center rounded-full bg-white/8 transition-colors hover:bg-white/15">
            <Icon name="Search" size={18} />
          </button>
          <button className="flex h-9 w-9 items-center justify-center rounded-full bg-white/8 transition-colors hover:bg-white/15">
            <Icon name="Edit3" size={18} />
          </button>
        </div>
      </div>

      {/* Search bar */}
      <div className="px-4 pb-3">
        <div className="flex items-center gap-3 rounded-2xl bg-white/8 px-4 py-2.5">
          <Icon name="Search" size={16} className="text-white/40" />
          <input
            className="flex-1 bg-transparent text-sm text-white placeholder:text-white/40 focus:outline-none"
            placeholder="Поиск"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery("")}>
              <Icon name="X" size={14} className="text-white/40" />
            </button>
          )}
        </div>
      </div>

      {/* Stories */}
      {!searchQuery && (
        <div className="flex gap-3 overflow-x-auto px-4 pb-4 scrollbar-none" style={{ scrollbarWidth: "none" }}>
          {STORIES.map((story) => (
            <button
              key={story.id}
              onClick={() => setActiveStory(story.id)}
              className="flex shrink-0 flex-col items-center gap-1.5"
            >
              <div className="relative">
                <div
                  className={`h-[62px] w-[62px] rounded-[22px] p-[2.5px] ${
                    story.seen ? "bg-white/15" : `bg-gradient-to-br ${story.color}`
                  }`}
                >
                  <div className="flex h-full w-full items-center justify-center rounded-[19px] bg-[#1a1a1a] text-lg font-semibold">
                    {story.isOwn ? (
                      <div className="relative flex h-full w-full items-center justify-center rounded-[19px] bg-gradient-to-br from-[#2AABEE] to-[#7B61FF]">
                        <span className="text-base font-bold">М</span>
                        <div className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#2AABEE] border-2 border-[#0e0e0e]">
                          <Icon name="Plus" size={10} />
                        </div>
                      </div>
                    ) : (
                      <span className="text-base">{story.avatar}</span>
                    )}
                  </div>
                </div>
              </div>
              <span className="max-w-[62px] truncate text-center text-[10px] text-white/70">
                {story.isOwn ? "Моя" : story.name.split(" ")[0]}
              </span>
            </button>
          ))}
        </div>
      )}

      {/* Chat list */}
      <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: "none" }}>
        {/* Pinned label */}
        {!searchQuery && (
          <div className="px-4 pb-1">
            <span className="text-[11px] font-medium uppercase tracking-wider text-white/30">Закреплённые</span>
          </div>
        )}

        {filteredChats.map((chat, idx) => {
          const isPinnedSection = chat.pinned && !searchQuery
          const firstUnpinned = !searchQuery && CHATS.findIndex((c) => !c.pinned) === idx

          return (
            <div key={chat.id}>
              {firstUnpinned && (
                <div className="px-4 py-1">
                  <span className="text-[11px] font-medium uppercase tracking-wider text-white/30">Все чаты</span>
                </div>
              )}
              <button
                onClick={() => setActiveChat(chat.id)}
                className="flex w-full items-center gap-3 px-4 py-3 transition-colors hover:bg-white/5 active:bg-white/8"
              >
                {/* Avatar */}
                <div className="relative shrink-0">
                  <div
                    className={`flex h-[52px] w-[52px] items-center justify-center rounded-[18px] bg-gradient-to-br ${chat.color} text-sm font-semibold`}
                  >
                    {chat.avatar}
                  </div>
                  {chat.online && (
                    <div className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full bg-green-400 border-2 border-[#0e0e0e]" />
                  )}
                  {chat.isChannel && (
                    <div className="absolute -bottom-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#2AABEE] border-2 border-[#0e0e0e]">
                      <Icon name="Radio" size={8} />
                    </div>
                  )}
                  {chat.isGroup && !chat.isChannel && (
                    <div className="absolute -bottom-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#7B61FF] border-2 border-[#0e0e0e]">
                      <Icon name="Users" size={8} />
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex flex-1 flex-col gap-0.5 overflow-hidden text-left">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5 overflow-hidden">
                      {chat.pinned && <Icon name="Pin" size={12} className="shrink-0 text-white/30 rotate-45" />}
                      <span className="truncate text-[15px] font-medium leading-tight">{chat.name}</span>
                    </div>
                    <span
                      className={`shrink-0 text-[12px] ${
                        chat.unread > 0 ? "text-[#2AABEE]" : "text-white/35"
                      }`}
                    >
                      {chat.time}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="truncate text-[13px] leading-snug text-white/50">{chat.lastMessage}</span>
                    {chat.unread > 0 && (
                      <div className="flex h-5 min-w-5 shrink-0 items-center justify-center rounded-full bg-[#2AABEE] px-1.5">
                        <span className="text-[11px] font-semibold text-white">{chat.unread}</span>
                      </div>
                    )}
                  </div>
                </div>
              </button>
            </div>
          )
        })}

        {filteredChats.length === 0 && (
          <div className="flex flex-col items-center gap-3 py-20 text-white/30">
            <Icon name="SearchX" size={40} />
            <span className="text-sm">Ничего не найдено</span>
          </div>
        )}

        <div className="h-24" />
      </div>

      {/* Bottom nav */}
      <div className="absolute bottom-0 left-0 right-0 flex items-center justify-around border-t border-white/8 bg-[#0e0e0e]/95 pb-6 pt-3 backdrop-blur-xl">
        {[
          { id: "chats", icon: "MessageCircle", label: "Чаты", badge: totalUnread },
          { id: "calls", icon: "Phone", label: "Звонки" },
          { id: "contacts", icon: "Users", label: "Контакты" },
          { id: "settings", icon: "Settings2", label: "Настройки" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={`relative flex flex-col items-center gap-1 px-4 transition-all ${
              activeTab === tab.id ? "text-[#2AABEE]" : "text-white/40"
            }`}
          >
            <Icon name={tab.icon} size={24} />
            <span className="text-[10px] font-medium">{tab.label}</span>
            {tab.badge && tab.badge > 0 && (
              <div className="absolute -top-0.5 right-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#2AABEE] px-1">
                <span className="text-[9px] font-bold text-white">{tab.badge > 99 ? "99+" : tab.badge}</span>
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Story viewer overlay */}
      {activeStory !== null && (
        <StoryViewer
          story={STORIES.find((s) => s.id === activeStory)!}
          onClose={() => setActiveStory(null)}
        />
      )}
    </div>
  )
}

function StoryViewer({
  story,
  onClose,
}: {
  story: (typeof STORIES)[0]
  onClose: () => void
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex flex-col bg-black"
      onClick={onClose}
    >
      {/* Progress bar */}
      <div className="flex gap-1 px-3 pt-12">
        {[0, 1, 2].map((i) => (
          <div key={i} className="h-0.5 flex-1 overflow-hidden rounded-full bg-white/30">
            <div
              className="h-full bg-white transition-all duration-[5000ms] ease-linear"
              style={{ width: i === 0 ? "100%" : "0%" }}
            />
          </div>
        ))}
      </div>

      {/* Story header */}
      <div className="flex items-center gap-3 px-4 py-3" onClick={(e) => e.stopPropagation()}>
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-[14px] bg-gradient-to-br ${story.color} text-sm font-semibold`}
        >
          {story.avatar}
        </div>
        <div>
          <div className="text-sm font-semibold">{story.name}</div>
          <div className="text-xs text-white/60">только что</div>
        </div>
        <button className="ml-auto" onClick={onClose}>
          <Icon name="X" size={22} />
        </button>
      </div>

      {/* Story content */}
      <div
        className={`flex flex-1 flex-col items-center justify-center bg-gradient-to-br ${story.color}`}
      >
        <span className="text-8xl font-bold text-white/20">{story.avatar}</span>
      </div>

      {/* Reply input */}
      <div className="flex items-center gap-3 p-4 pb-10" onClick={(e) => e.stopPropagation()}>
        <input
          className="flex-1 rounded-full bg-white/15 px-4 py-2.5 text-sm placeholder:text-white/50 focus:outline-none"
          placeholder={`Ответить ${story.name.split(" ")[0]}...`}
        />
        <button className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15">
          <Icon name="Send" size={18} />
        </button>
      </div>
    </div>
  )
}

function ChatView({
  chat,
  onBack,
}: {
  chat: (typeof CHATS)[0]
  onBack: () => void
}) {
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
    <div className="flex h-screen flex-col bg-[#0e0e0e] text-white">
      {/* Chat header */}
      <div className="flex items-center gap-3 border-b border-white/8 px-4 pb-3 pt-12 bg-[#0e0e0e]">
        <button
          onClick={onBack}
          className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-white/8 transition-colors"
        >
          <Icon name="ChevronLeft" size={22} />
        </button>
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-[14px] bg-gradient-to-br ${chat.color} text-sm font-semibold shrink-0`}
        >
          {chat.avatar}
        </div>
        <div className="flex-1 overflow-hidden">
          <div className="truncate text-[15px] font-semibold">{chat.name}</div>
          <div className="text-[12px] text-white/50">
            {chat.online ? "в сети" : chat.isGroup ? "4 участника" : "был(а) недавно"}
          </div>
        </div>
        <div className="flex gap-1">
          <button className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-white/8 transition-colors">
            <Icon name="Phone" size={18} />
          </button>
          <button className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-white/8 transition-colors">
            <Icon name="MoreVertical" size={18} />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-1.5" style={{ scrollbarWidth: "none" }}>
        <div className="flex justify-center mb-4">
          <span className="rounded-full bg-white/8 px-3 py-1 text-[11px] text-white/50">Сегодня</span>
        </div>

        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.mine ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[75%] rounded-[18px] px-4 py-2.5 ${
                msg.mine
                  ? "rounded-br-[6px] bg-gradient-to-br from-[#2AABEE] to-[#5B8DEF] text-white"
                  : "rounded-bl-[6px] bg-white/10 text-white"
              }`}
            >
              <p className="text-[14px] leading-relaxed">{msg.text}</p>
              <div className={`flex items-center gap-1 mt-0.5 ${msg.mine ? "justify-end" : "justify-start"}`}>
                <span className="text-[10px] opacity-70">{msg.time}</span>
                {msg.mine && (
                  <Icon name="CheckCheck" size={12} className={msg.read ? "text-white" : "opacity-50"} />
                )}
              </div>
            </div>
          </div>
        ))}
        <div className="h-4" />
      </div>

      {/* Input */}
      <div className="flex items-end gap-2 border-t border-white/8 px-3 pb-8 pt-3 bg-[#0e0e0e]">
        <button className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full hover:bg-white/8 transition-colors">
          <Icon name="Paperclip" size={20} className="text-white/60" />
        </button>
        <div className="flex flex-1 items-end rounded-[22px] bg-white/8 px-4 py-2.5">
          <textarea
            rows={1}
            className="flex-1 resize-none bg-transparent text-sm text-white placeholder:text-white/40 focus:outline-none"
            placeholder="Сообщение..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            style={{ maxHeight: "120px" }}
          />
          <button className="ml-2 shrink-0">
            <Icon name="Smile" size={20} className="text-white/60" />
          </button>
        </div>
        <button
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-all ${
            message.trim()
              ? "bg-gradient-to-br from-[#2AABEE] to-[#5B8DEF]"
              : "bg-gradient-to-br from-[#2AABEE] to-[#5B8DEF]"
          }`}
        >
          {message.trim() ? (
            <Icon name="Send" size={18} />
          ) : (
            <Icon name="Mic" size={18} />
          )}
        </button>
      </div>
    </div>
  )
}
