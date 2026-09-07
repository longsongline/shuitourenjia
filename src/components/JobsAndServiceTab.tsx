import React, { useState } from 'react';
import { JobItem, ServiceContact } from '../types';
import { 
  Briefcase, 
  PhoneCall, 
  MapPin, 
  Building2, 
  PlusCircle, 
  CheckCircle2, 
  Copy, 
  Phone, 
  Sparkles
} from 'lucide-react';

interface JobsAndServiceTabProps {
  jobs: JobItem[];
  services: ServiceContact[];
  searchQuery: string;
  onOpenPostJobModal: () => void;
  isMobileFrame?: boolean;
}

export const JobsAndServiceTab: React.FC<JobsAndServiceTabProps> = ({
  jobs,
  services,
  searchQuery,
  onOpenPostJobModal,
  isMobileFrame = true,
}) => {
  const [subTab, setSubTab] = useState<'jobs' | 'services'>('jobs');
  const [selectedJobFilter, setSelectedJobFilter] = useState<string>('全部');
  const [selectedServiceCat, setSelectedServiceCat] = useState<string>('全部');
  const [activeContactModal, setActiveContactModal] = useState<JobItem | null>(null);
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const jobFilters = ['全部', '急聘', '皮具产业', '电商外贸', '餐饮服务'];
  const serviceCategories = ['全部', '公共交通', '应急热线', '政务村委', '生活维修', '景区文旅'];

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch = !searchQuery ||
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

    if (selectedJobFilter === '急聘') return matchesSearch && job.type === '急聘';
    if (selectedJobFilter === '皮具产业') return matchesSearch && (job.title.includes('皮') || job.company.includes('皮'));
    if (selectedJobFilter === '电商外贸') return matchesSearch && (job.title.includes('电商') || job.title.includes('外贸'));
    if (selectedJobFilter === '餐饮服务') return matchesSearch && (job.title.includes('厨') || job.company.includes('餐饮'));
    return matchesSearch;
  });

  const filteredServices = services.filter((srv) => {
    const matchesCat = selectedServiceCat === '全部' || srv.category === selectedServiceCat;
    const matchesSearch = !searchQuery ||
      srv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      srv.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleCopy = (text: string, label: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedText(`已复制${label}: ${text}`);
      setTimeout(() => setCopiedText(null), 2500);
    }
  };

  return (
    <div className="space-y-4 pb-12">
      {/* Sub-tab switcher (Bento Style) */}
      <div className="flex bg-white p-1.5 rounded-2xl border border-gray-100 shadow-2xs">
        <button
          onClick={() => setSubTab('jobs')}
          className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
            subTab === 'jobs'
              ? 'bg-[#1A1A1B] text-white shadow-xs'
              : 'text-gray-500 hover:text-[#1A1A1B]'
          }`}
        >
          <Briefcase className="w-4 h-4 text-orange-400" />
          水头招工求职 ({jobs.length})
        </button>
        <button
          onClick={() => setSubTab('services')}
          className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
            subTab === 'services'
              ? 'bg-[#1A1A1B] text-white shadow-xs'
              : 'text-gray-500 hover:text-[#1A1A1B]'
          }`}
        >
          <PhoneCall className="w-4 h-4 text-cyan-400" />
          便民黄页 & 服务 ({services.length})
        </button>
      </div>

      {/* JOBS SECTION */}
      {subTab === 'jobs' && (
        <div className="space-y-4">
          {/* Bento Header Promo */}
          <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm relative overflow-hidden flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div className="absolute top-0 left-0 w-full h-1 bg-orange-500" />
            <div>
              <span className="text-[10px] font-bold text-orange-600 bg-orange-50 px-2.5 py-0.5 rounded-full border border-orange-100">
                支持返乡青年与“中国皮都”实体产业
              </span>
              <h3 className="font-bold text-base sm:text-lg text-[#1A1A1B] mt-1.5 leading-tight">
                水头本地企业招工直聘平台
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                高薪岗位直联HR / 厂长，本镇及在外老乡免费发布招聘
              </p>
            </div>
            <button
              onClick={onOpenPostJobModal}
              className="shrink-0 px-4 py-2 bg-[#B91C1C] hover:bg-[#991b1b] text-white font-medium rounded-xl text-xs shadow-xs active:scale-95 transition-all flex items-center gap-1.5"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              免费发布招聘
            </button>
          </div>

          {/* Filter pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar text-xs">
            {jobFilters.map((flt) => (
              <button
                key={flt}
                onClick={() => setSelectedJobFilter(flt)}
                className={`px-3.5 py-1.5 rounded-xl font-medium whitespace-nowrap transition-all ${
                  selectedJobFilter === flt
                    ? 'bg-[#1A1A1B] text-white font-bold shadow-xs'
                    : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                }`}
              >
                {flt}
              </button>
            ))}
          </div>

          {/* Job cards in Bento Grid */}
          <div className={isMobileFrame ? 'grid grid-cols-1 gap-4' : 'grid grid-cols-1 lg:grid-cols-2 gap-4'}>
            {filteredJobs.map((job) => (
              <div
                key={job.id}
                className="bg-white rounded-3xl border border-gray-100 p-4 sm:p-5 shadow-sm hover:border-gray-200 transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Row 1: Job Title & Salary */}
                  <div className="flex items-start justify-between gap-2.5">
                    <div className="flex items-center gap-2 flex-wrap min-w-0 flex-1">
                      {job.type === '急聘' && (
                        <span className="text-[10px] sm:text-[11px] bg-red-50 text-[#B91C1C] font-bold px-2 py-0.5 rounded-md border border-red-200 shrink-0 whitespace-nowrap">
                          🔥 急聘
                        </span>
                      )}
                      <h4 className="font-bold text-sm sm:text-base text-[#1A1A1B] leading-snug truncate">
                        {job.title}
                      </h4>
                    </div>
                    <div className="shrink-0 whitespace-nowrap text-right">
                      <span className="text-[#B91C1C] font-black text-sm sm:text-base">
                        {job.salary}
                      </span>
                    </div>
                  </div>

                  {/* Row 2: Company & Publish Time */}
                  <div className="flex items-center justify-between gap-2 mt-1.5 text-xs text-gray-600 flex-wrap">
                    <div className="flex items-center gap-1.5 font-medium min-w-0 flex-1">
                      <Building2 className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                      <span className="truncate">{job.company}</span>
                    </div>
                    <span className="text-[11px] text-gray-400 shrink-0 whitespace-nowrap">
                      {job.postedTime}发布
                    </span>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mt-2.5">
                    {job.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] sm:text-[11px] bg-amber-50/70 text-amber-900 px-2.5 py-0.5 rounded-lg font-medium border border-amber-200/60 whitespace-nowrap"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Requirements in inner Bento card */}
                  <div className="bg-[#F8F9FA] p-3 rounded-2xl mt-3 space-y-1.5 text-xs text-gray-600 border border-gray-100">
                    {job.requirements.map((req, idx) => (
                      <div key={idx} className="flex items-start gap-1.5 text-xs leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-1.5 shrink-0" />
                        <span>{req}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer: Location & Action */}
                <div className="flex items-center justify-between gap-2 pt-3 mt-3 border-t border-gray-100 text-xs text-gray-500">
                  <div className="flex items-center gap-1 truncate text-xs text-gray-500 min-w-0 flex-1">
                    <MapPin className="w-3.5 h-3.5 text-[#B91C1C] shrink-0" />
                    <span className="truncate">{job.location}</span>
                  </div>
                  <button
                    onClick={() => setActiveContactModal(job)}
                    className="shrink-0 whitespace-nowrap px-3.5 py-2 bg-[#1A1A1B] hover:bg-[#B91C1C] active:scale-95 text-white rounded-xl font-bold text-xs shadow-xs transition-all flex items-center gap-1.5"
                  >
                    <Phone className="w-3.5 h-3.5 text-orange-400" />
                    <span>立即应聘 / 电联</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SERVICES SECTION */}
      {subTab === 'services' && (
        <div className="space-y-4">
          {/* Service Bento Banner */}
          <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-cyan-600" />
            <span className="text-[10px] font-bold text-cyan-700 bg-cyan-50 px-2.5 py-0.5 rounded-full border border-cyan-100">
              水头一刻钟便民便商网络
            </span>
            <h3 className="font-bold text-base sm:text-lg text-[#1A1A1B] mt-1.5">
              水头同城便民黄页与应急服务热线
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              客运班车、鳌江动车站专线接驳、水电气抢修、平阳二医急救直拨
            </p>
          </div>

          {/* Service Category Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar text-xs">
            {serviceCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedServiceCat(cat)}
                className={`px-3.5 py-1.5 rounded-xl font-medium whitespace-nowrap transition-all ${
                  selectedServiceCat === cat
                    ? 'bg-[#1A1A1B] text-white font-bold shadow-xs'
                    : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Service contacts cards in Bento Grid */}
          <div className={isMobileFrame ? 'grid grid-cols-1 gap-4' : 'grid grid-cols-1 lg:grid-cols-2 gap-4'}>
            {filteredServices.map((srv) => (
              <div
                key={srv.id}
                className="bg-white rounded-3xl border border-gray-100 p-4 sm:p-5 shadow-sm hover:border-gray-200 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-bold text-cyan-700 bg-cyan-50 px-2 py-0.5 rounded-md border border-cyan-100">
                        {srv.category}
                      </span>
                      <h4 className="font-bold text-sm sm:text-base text-[#1A1A1B] mt-1.5">
                        {srv.name}
                      </h4>
                    </div>
                    <a
                      href={`tel:${srv.phone}`}
                      className="px-3.5 py-2 bg-[#B91C1C] hover:bg-[#991b1b] text-white rounded-xl text-xs font-bold shadow-xs flex items-center gap-1 shrink-0 active:scale-95 transition-all whitespace-nowrap"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>一键拨打</span>
                    </a>
                  </div>

                  <p className="text-xs text-gray-500 mt-2.5 leading-relaxed bg-[#F8F9FA] p-2.5 rounded-2xl border border-gray-100">
                    {srv.desc}
                  </p>
                </div>

                <div className="mt-3 pt-2.5 border-t border-gray-100 flex flex-col gap-1.5 text-xs text-gray-500">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1 font-mono text-[#1A1A1B] font-bold">
                      <PhoneCall className="w-3.5 h-3.5 text-[#B91C1C]" />
                      {srv.phone}
                    </span>
                    <span className="text-gray-400 text-[11px]">服务: {srv.workHours}</span>
                  </div>
                  {srv.address && (
                    <div className="flex items-center gap-1 text-gray-400 truncate text-[11px]">
                      <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                      <span className="truncate">{srv.address}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Direct Contact Modal for Job Applicants */}
      {activeContactModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl p-5 w-full max-w-sm shadow-2xl border border-gray-200">
            <h3 className="font-bold text-base text-[#1A1A1B] mb-1">
              联系招聘负责人
            </h3>
            <p className="text-xs text-gray-500 mb-4">
              应聘职位: <strong className="text-[#1A1A1B]">{activeContactModal.title}</strong> ({activeContactModal.company})
            </p>

            <div className="space-y-3 bg-[#F8F9FA] p-3.5 rounded-2xl border border-gray-200 mb-4 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-gray-500">联系人:</span>
                <span className="font-bold text-[#1A1A1B]">{activeContactModal.contactName}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500">联系电话:</span>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-[#B91C1C]">{activeContactModal.phone}</span>
                  <button
                    onClick={() => handleCopy(activeContactModal.phone, '电话')}
                    className="p-1 hover:bg-gray-200 rounded"
                    title="复制"
                  >
                    <Copy className="w-3 h-3 text-gray-500" />
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500">微信号:</span>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-gray-800">{activeContactModal.wechat}</span>
                  <button
                    onClick={() => handleCopy(activeContactModal.wechat, '微信')}
                    className="p-1 hover:bg-gray-200 rounded"
                    title="复制微信"
                  >
                    <Copy className="w-3 h-3 text-gray-500" />
                  </button>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setActiveContactModal(null)}
                className="flex-1 py-2.5 rounded-xl border border-gray-200 text-gray-700 text-xs font-medium hover:bg-gray-50"
              >
                关闭
              </button>
              <a
                href={`tel:${activeContactModal.phone}`}
                className="flex-1 py-2.5 rounded-xl bg-[#B91C1C] text-white text-xs font-medium hover:bg-[#991b1b] text-center flex items-center justify-center gap-1 shadow-xs"
              >
                <Phone className="w-3.5 h-3.5" />
                立即呼叫
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Copy Toast feedback */}
      {copiedText && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 bg-[#1A1A1B] text-white text-xs px-4 py-2 rounded-full shadow-2xl flex items-center gap-2 border border-white/10">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{copiedText}</span>
        </div>
      )}
    </div>
  );
};
