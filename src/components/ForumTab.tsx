import React, { useState } from 'react';
import { ForumPost } from '../types';
import { 
  Heart, 
  MessageSquare, 
  MapPin, 
  PlusCircle, 
  Send, 
  Share2, 
  Sparkles
} from 'lucide-react';

interface ForumTabProps {
  posts: ForumPost[];
  searchQuery: string;
  onLikePost: (id: string) => void;
  onAddComment: (postId: string, text: string) => void;
  onOpenCreatePost: () => void;
  isMobileFrame?: boolean;
}

export const ForumTab: React.FC<ForumTabProps> = ({
  posts,
  searchQuery,
  onLikePost,
  onAddComment,
  onOpenCreatePost,
  isMobileFrame = true,
}) => {
  const [selectedTag, setSelectedTag] = useState<string>('全部');
  const [activeCommentPostId, setActiveCommentPostId] = useState<string | null>(null);
  const [commentInput, setCommentInput] = useState<string>('');

  const tags = ['全部', '乡音闲聊', '打听互助', '游子归乡', '水头新鲜事', '拼车拼单'];

  const filteredPosts = posts.filter((post) => {
    const matchesTag = selectedTag === '全部' || post.tag === selectedTag;
    const matchesSearch = !searchQuery ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.currentCity.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTag && matchesSearch;
  });

  const handleSendComment = (postId: string) => {
    if (!commentInput.trim()) return;
    onAddComment(postId, commentInput.trim());
    setCommentInput('');
  };

  return (
    <div className="space-y-4 pb-12">
      {/* Dark Bento Forum Banner (Matching Design's #1A1A1B card aesthetic) */}
      <div className="bg-[#1A1A1B] text-white rounded-3xl p-5 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 relative overflow-hidden">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-amber-300 font-bold mb-1">
            <Sparkles className="w-3.5 h-3.5" /> 线上乡情家园 · 随时随地聊老家
          </div>
          <h3 className="font-bold text-base sm:text-lg text-white">
            水头乡情论坛 · 乡友交流圈
          </h3>
          <p className="text-xs text-gray-400 mt-1">
            老乡互助打听、在外游子聚会联谊、家乡生活随笔分享
          </p>
        </div>
        <button
          onClick={onOpenCreatePost}
          className="shrink-0 px-4 py-2 bg-[#B91C1C] hover:bg-[#991b1b] text-white font-medium rounded-xl text-xs shadow-xs active:scale-95 transition-all flex items-center gap-1.5"
        >
          <PlusCircle className="w-3.5 h-3.5" />
          发布乡情微帖
        </button>
      </div>

      {/* Category Tags (Bento Style) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar text-xs">
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => setSelectedTag(tag)}
            className={`px-3.5 py-1.5 rounded-xl font-medium whitespace-nowrap transition-all ${
              selectedTag === tag
                ? 'bg-[#1A1A1B] text-white font-bold shadow-xs'
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Posts Stream (Bento Grid) */}
      <div className={isMobileFrame ? 'grid grid-cols-1 gap-4' : 'grid grid-cols-1 lg:grid-cols-2 gap-4'}>
        {filteredPosts.map((post) => {
          const isCommenting = activeCommentPostId === post.id;
          return (
            <div
              key={post.id}
              className="bg-white rounded-3xl border border-gray-100 p-4 sm:p-5 shadow-sm hover:border-gray-200 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Header: Author & City Tag */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={post.avatar}
                      alt={post.author}
                      className="w-9 h-9 rounded-2xl object-cover border border-gray-100"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-xs sm:text-sm text-[#1A1A1B]">{post.author}</span>
                        <span className="text-[10px] bg-[#FEF2F2] text-[#B91C1C] font-bold px-2 py-0.5 rounded-full border border-red-100">
                          {post.tag}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-[11px] text-gray-400 mt-0.5">
                        <MapPin className="w-2.5 h-2.5 text-amber-500" />
                        <span>{post.currentCity}</span>
                        <span>•</span>
                        <span>{post.time}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Post Content */}
                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed whitespace-pre-line mb-3">
                  {post.content}
                </p>

                {/* Attached Images Grid */}
                {post.images && post.images.length > 0 && (
                  <div className={`grid gap-2 mb-3 ${post.images.length === 1 ? 'grid-cols-1' : 'grid-cols-2'}`}>
                    {post.images.map((img, idx) => (
                      <img
                        key={idx}
                        src={img}
                        alt="post attachment"
                        className="w-full h-36 sm:h-44 object-cover rounded-2xl border border-gray-100"
                        referrerPolicy="no-referrer"
                      />
                    ))}
                  </div>
                )}
              </div>

              <div>
                {/* Action Buttons: Like, Comment, Share */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-100 text-xs text-gray-500">
                  <button
                    onClick={() => onLikePost(post.id)}
                    className={`flex items-center gap-1 font-medium transition-colors ${
                      post.isLiked ? 'text-[#B91C1C] font-bold' : 'hover:text-[#B91C1C]'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${post.isLiked ? 'fill-[#B91C1C] text-[#B91C1C]' : ''}`} />
                    <span>{post.likes} 赞</span>
                  </button>

                  <button
                    onClick={() => setActiveCommentPostId(isCommenting ? null : post.id)}
                    className="flex items-center gap-1 hover:text-[#1A1A1B] font-medium transition-colors"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>{post.comments.length} 评论</span>
                  </button>

                  <button
                    onClick={() => {
                      if (navigator.clipboard) {
                        navigator.clipboard.writeText(`【水头家园】${post.author} 说：${post.content.slice(0, 30)}...`);
                        alert('乡友发言已复制，可分享至微信！');
                      }
                    }}
                    className="flex items-center gap-1 hover:text-[#1A1A1B]"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>分享</span>
                  </button>
                </div>

                {/* Comments Section */}
                {(isCommenting || post.comments.length > 0) && (
                  <div className="mt-3 pt-3 border-t border-gray-100 space-y-2">
                    {/* Comments list */}
                    {post.comments.map((cmt) => (
                      <div key={cmt.id} className="bg-[#F8F9FA] p-2.5 rounded-2xl text-xs space-y-0.5 border border-gray-100">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-[#1A1A1B] flex items-center gap-1">
                            {cmt.user}
                            <span className="text-[10px] text-gray-400 font-normal">({cmt.city})</span>
                          </span>
                          <span className="text-[10px] text-gray-400">{cmt.time}</span>
                        </div>
                        <p className="text-gray-600 leading-snug">{cmt.text}</p>
                      </div>
                    ))}

                    {/* Inline Comment Input */}
                    <div className="flex items-center gap-2 mt-2">
                      <input
                        type="text"
                        value={commentInput}
                        onChange={(e) => setCommentInput(e.target.value)}
                        placeholder="写下你的老乡留言..."
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handleSendComment(post.id);
                        }}
                        className="flex-1 px-3 py-2 rounded-xl bg-[#F8F9FA] text-[#1A1A1B] text-xs focus:outline-none focus:ring-1 focus:ring-[#B91C1C] border border-gray-200"
                      />
                      <button
                        onClick={() => handleSendComment(post.id)}
                        className="px-3.5 py-2 bg-[#B91C1C] hover:bg-[#991b1b] text-white rounded-xl text-xs font-medium flex items-center gap-1 active:scale-95 transition-all shadow-2xs"
                      >
                        <Send className="w-3 h-3" />
                        发送
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
