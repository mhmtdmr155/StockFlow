import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import * as Icons from 'lucide-react';
import { getCategories, getProducts } from '../api/products';
import { getDashboardStats, getDashboardCharts } from '../api/dashboard';
import { Package, AlertTriangle, Layers, ArrowUpRight, ArrowDownRight, Clock, User as UserIcon, ChevronRight, Plus } from 'lucide-react';
import { Skeleton } from '../components/ui/skeleton';
import { useTheme } from '../context/ThemeProvider';

const timeAgo = (dateString: string) => {
  const diffMs = Date.now() - new Date(dateString).getTime();
  const m = Math.floor(diffMs / 60000);
  if (m < 1) return 'Az önce';
  if (m < 60) return `${m} dk önce`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h} sa önce`;
  return `${Math.floor(h / 24)} gün önce`;
};

/* ─── Stat Card ──────────────────────── */
type StatCardProps = {
  title: string;
  value: React.ReactNode;
  icon: React.ReactNode;
  hint: string;
  active?: boolean;
  onClick: () => void;
  isDark: boolean;
  accent: { light: string; dark: string; ring: string; };
};

const StatCard = ({ title, value, icon, hint, active, onClick, isDark, accent }: StatCardProps) => (
  <button
    onClick={onClick}
    className={`
      w-full text-left rounded-xl p-5 border transition-all duration-150 cursor-pointer btn-tactile min-h-[48px]
      hover:shadow-md focus:outline-none focus:ring-2 focus:ring-amber-500/40
      ${isDark
        ? `bg-[#1e293b] border-white/[0.07] hover:border-white/[0.12]
           ${active ? 'ring-2 ring-amber-500/40 border-transparent bg-amber-950/20' : ''}`
        : `bg-white border-slate-200/80 hover:border-slate-300
           shadow-sm shadow-slate-900/[0.04]
           ${active ? `ring-2 ${accent.ring} border-transparent` : ''}`
      }
    `}
  >
    <div className="flex items-start justify-between gap-3 mb-4">
      <p className={`text-xs font-semibold uppercase tracking-wider
        ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
        {title}
      </p>
      <div className={`p-2 rounded-md flex-shrink-0 ${isDark ? accent.dark : accent.light}`}>
        {icon}
      </div>
    </div>
    <div className={`text-3xl font-bold tracking-tight mb-2 font-mono anim-number-tick
      ${isDark ? 'text-white' : 'text-slate-900'}`}>
      {value}
    </div>
    <p className={`text-xs font-semibold flex items-center gap-1
      ${active
        ? isDark ? 'text-amber-400' : 'text-amber-600'
        : isDark ? 'text-slate-500' : 'text-slate-400'
      }`}>
      {hint}
    </p>
  </button>
);

/* ─── Section Card ───────────────────── */
const SectionCard = ({ children, title, description, icon, isDark, className = '' }: any) => (
  <div className={`
    rounded-xl border overflow-hidden shadow-sm ${className}
    ${isDark
      ? 'bg-[#1e293b] border-white/[0.07]'
      : 'bg-white border-slate-200/80 shadow-slate-900/[0.03]'
    }
  `}>
    <div className={`px-5 py-4 border-b flex items-center gap-3
      ${isDark ? 'border-white/[0.06]' : 'border-slate-100'}`}>
      <div className={`p-1.5 rounded-md ${isDark ? 'bg-white/[0.06]' : 'bg-amber-50'}`}>
        {icon}
      </div>
      <div>
        <h3 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}>{title}</h3>
        {description && (
          <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-400'}`}>{description}</p>
        )}
      </div>
    </div>
    {children}
  </div>
);

/* ─── Main Page ──────────────────────── */
export const DashboardPage = () => {
  const [showDist, setShowDist] = useState(false);
  const [showLow, setShowLow] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const { data: products, isLoading: loadingProducts } = useQuery({
    queryKey: ['products'],
    queryFn: () => getProducts(),
  });

  const lowStock = products?.filter(p => p.stockQuantity <= (p.minimumStock || 0)) || [];

  const { data: stats, isLoading: loadingStats } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: getDashboardStats,
  });

  const { data: charts, isLoading: loadingCharts } = useQuery({
    queryKey: ['dashboard-charts'],
    queryFn: getDashboardCharts,
  });

  const { data: categories, isLoading: loadingCats } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  });

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto">

      {/* Page Title */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className={`text-xl sm:text-2xl font-bold tracking-tight
            ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Genel Bakış
          </h1>
          <p className={`text-sm mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            Depo stok durumunun anlık özeti
          </p>
        </div>
        <span className={`hidden sm:flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full
          ${isDark
            ? 'bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/20'
            : 'bg-emerald-50 text-emerald-600 ring-1 ring-emerald-200'
          }`}>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          Canlı
        </span>
      </div>

      {/* ── Stat Cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          isDark={isDark}
          title="Toplam Kategori"
          value={loadingStats ? <Skeleton className="h-9 w-12 inline-block" /> : stats?.totalCategories || 0}
          icon={<FolderIcon className={`h-4 w-4 ${isDark ? 'text-slate-400' : 'text-slate-500'}`} />}
          hint="↓ Kategorilere git"
          onClick={() => document.getElementById('cats')?.scrollIntoView({ behavior: 'smooth' })}
          accent={{ light: 'bg-slate-100 text-slate-700', dark: 'bg-white/10 text-white', ring: 'ring-slate-300' }}
        />
        <StatCard
          isDark={isDark}
          title="Toplam Stok"
          value={loadingStats ? <Skeleton className="h-9 w-16 inline-block" /> : (stats?.totalStock || 0).toLocaleString('tr-TR')}
          icon={<Package className={`h-4 w-4 ${isDark ? 'text-amber-400' : 'text-amber-600'}`} />}
          hint={showDist ? '▲ Dağılımı kapat' : '▼ Kategori dağılımı'}
          active={showDist}
          onClick={() => setShowDist(v => !v)}
          accent={{ light: 'bg-amber-50 text-amber-600', dark: 'bg-amber-500/10 text-amber-400', ring: 'ring-amber-300' }}
        />
        <StatCard
          isDark={isDark}
          title="Kritik Stok"
          value={
            loadingStats
              ? <Skeleton className="h-9 w-8 inline-block" />
              : <span className={isDark ? 'text-red-400' : 'text-red-600'}>{stats?.lowStockCount || 0}</span>
          }
          icon={<AlertTriangle className={`h-4 w-4 ${isDark ? 'text-red-400' : 'text-red-500'}`} />}
          hint={showLow ? '▲ Listeyi kapat' : '▼ Kritik ürünleri gör'}
          active={showLow}
          onClick={() => setShowLow(v => !v)}
          accent={{ light: 'bg-red-50 text-red-600', dark: 'bg-red-500/10 text-red-400', ring: 'ring-red-300' }}
        />
      </div>

      {/* ── Expandable Panels ── */}
      {(showDist || showLow) && (
        <div className={`grid gap-4 ${showDist && showLow ? 'lg:grid-cols-2' : 'grid-cols-1'}`}>

          {/* Category Distribution */}
          {showDist && (
            <SectionCard
              isDark={isDark}
              title="Kategori Stok Dağılımı"
              description="Stoğa göre sıralı"
              icon={<Layers className={`h-4 w-4 ${isDark ? 'text-amber-400' : 'text-amber-500'}`} />}
              className="anim-number-tick"
            >
              <div className="p-5 space-y-3.5 max-h-72 overflow-y-auto">
                {loadingCharts
                  ? [1,2,3].map(i => <Skeleton key={i} className="h-7 w-full rounded-lg" />)
                  : [...(charts?.categoryDistribution || [])].sort((a, b) => b.totalStock - a.totalStock).map(item => {
                      const pct = Math.min(Math.round((item.totalStock / (stats?.totalStock || 1)) * 100), 100);
                      return (
                        <div key={item.categoryName}>
                          <div className="flex justify-between items-center mb-1.5">
                            <span className={`text-xs font-semibold ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
                              {item.categoryName}
                            </span>
                            <span className={`text-xs font-mono font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                              {item.totalStock.toLocaleString('tr-TR')} ({pct}%)
                            </span>
                          </div>
                          <div className={`h-1.5 w-full rounded-full ${isDark ? 'bg-white/[0.06]' : 'bg-slate-100'}`}>
                            <div
                              className="h-full rounded-full bg-amber-600 transition-all duration-700"
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                        </div>
                      );
                    })
                }
              </div>
            </SectionCard>
          )}

          {/* Low Stock */}
          {showLow && (
            <SectionCard
              isDark={isDark}
              title="Kritik Stok Uyarısı"
              description={`${lowStock.length} ürün minimum seviyenin altında`}
              icon={<AlertTriangle className="h-4 w-4 text-red-500" />}
              className="anim-number-tick"
            >
              <div className="max-h-72 overflow-y-auto">
                {loadingProducts
                  ? <div className="p-5 space-y-3">{[1,2,3].map(i => <Skeleton key={i} className="h-10 w-full rounded-lg" />)}</div>
                  : lowStock.length === 0
                    ? <p className="text-center py-10 text-sm text-slate-500">Şu an kritik stok yok 🎉</p>
                    : lowStock.map(p => (
                        <Link key={p.id} to={`/product/${p.id}`}
                          className={`flex items-center justify-between px-5 py-3.5 border-b last:border-0 transition-colors group min-h-[48px]
                            ${isDark ? 'border-white/[0.05] hover:bg-white/[0.03]' : 'border-slate-100 hover:bg-slate-50'}`}>
                          <div className="flex items-center gap-3 min-w-0">
                            <div className={`h-8 w-8 rounded-md flex items-center justify-center shrink-0
                              ${isDark ? 'bg-red-500/10 text-red-400' : 'bg-red-100 text-red-600'}`}>
                              <Package className="h-4 w-4" />
                            </div>
                            <div className="min-w-0">
                              <p className={`text-sm font-bold truncate ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                                {p.productCode}
                              </p>
                              <p className={`text-xs truncate ${isDark ? 'text-slate-400' : 'text-slate-400'}`}>
                                {p.name}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3 shrink-0">
                            <div className="text-right">
                              <p className={`text-sm font-bold font-mono ${isDark ? 'text-red-400' : 'text-red-600'}`}>
                                {p.stockQuantity}
                                <span className={`text-xs font-semibold ml-0.5 ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                                  /{p.minimumStock}
                                </span>
                              </p>
                              <p className={`text-[10px] ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>adet</p>
                            </div>
                            <ChevronRight className={`h-5 w-5 ${isDark ? 'text-slate-500' : 'text-slate-300'} group-hover:text-amber-600 transition-colors`} />
                          </div>
                        </Link>
                      ))
                }
              </div>
            </SectionCard>
          )}
        </div>
      )}

      {/* ── Activity Feed ── */}
      <SectionCard
        isDark={isDark}
        title="Son Aktiviteler"
        description="Depodaki son stok hareketleri"
        icon={<Clock className={`h-4 w-4 ${isDark ? 'text-slate-400' : 'text-slate-500'}`} />}
      >
        <div className="max-h-80 overflow-y-auto">
          {loadingCharts
            ? <div className="p-5 space-y-3">{[1,2,3].map(i => <Skeleton key={i} className="h-12 w-full rounded-lg" />)}</div>
            : charts?.recentMovements.length === 0
              ? <p className="text-center py-10 text-sm text-slate-500">Henüz stok hareketi yok.</p>
              : charts?.recentMovements.map(m => {
                  const isIn = m.movementType === 'IN';
                  return (
                    <div key={m.id}
                      className={`flex items-center gap-4 px-5 py-3.5 border-b last:border-0 min-h-[48px]
                        ${isDark ? 'border-white/[0.05]' : 'border-slate-100'}`}>
                      <div className={`h-9 w-9 rounded-md flex items-center justify-center shrink-0
                        ${isIn
                          ? isDark ? 'bg-emerald-500/10 text-emerald-400' : 'bg-emerald-100 text-emerald-600'
                          : isDark ? 'bg-rose-500/10 text-rose-400' : 'bg-rose-100 text-rose-600'
                        }`}>
                        {isIn ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <Link to={`/product/${m.productId}`}
                            className={`text-sm font-bold truncate hover:underline
                              ${isDark ? 'text-amber-400' : 'text-amber-600'}`}>
                            {m.product.productCode}
                          </Link>
                          <span className={`hidden sm:inline text-xs px-2 py-0.5 rounded-full font-bold font-mono shrink-0
                            ${isIn
                              ? isDark ? 'bg-emerald-500/10 text-emerald-400' : 'bg-emerald-100 text-emerald-700'
                              : isDark ? 'bg-rose-500/10 text-rose-400' : 'bg-rose-100 text-rose-700'
                            }`}>
                            {isIn ? '+' : ''}{m.changeAmount} adet
                          </span>
                        </div>
                        <div className={`flex items-center gap-2 text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-400'}`}>
                          <UserIcon className="h-3 w-3" />
                          <span>{m.user.username}</span>
                          {m.reason && <span className="truncate">· "{m.reason}"</span>}
                        </div>
                      </div>
                      <span className={`text-xs shrink-0 ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                        {timeAgo(m.createdAt)}
                      </span>
                    </div>
                  );
                })
          }
        </div>
      </SectionCard>

      {/* ── Categories ── */}
      <div id="cats" className="scroll-mt-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className={`text-base font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Kategoriler
          </h2>
        </div>
        <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
          {loadingCats ? (
            Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-28 rounded-xl animate-pulse" />)
          ) : (
            <>
              {categories?.filter(c => !c.parentId).map(cat => {
                const IC = Icons[cat.icon as keyof typeof Icons] as React.ElementType;
                return (
                  <Link key={cat.id} to={`/category/${cat.id}`} className="min-h-[48px] flex">
                    <div className={`
                      group rounded-xl border p-4 flex flex-col items-center justify-center gap-2.5 w-full
                      text-center cursor-pointer transition-all duration-150 btn-tactile
                      hover:shadow-md
                      ${isDark
                        ? 'bg-[#1e293b] border-white/[0.07] hover:border-white/[0.14] hover:shadow-black/20'
                        : 'bg-white border-slate-200/80 hover:border-amber-200 hover:shadow-amber-100/30 shadow-sm shadow-slate-900/[0.04]'
                      }
                    `}>
                      <div className={`
                        h-11 w-11 rounded-md flex items-center justify-center
                        transition-transform duration-150 group-hover:scale-105
                        bg-amber-500/10
                      `}>
                        {IC && <IC className="h-5 w-5 text-amber-600 dark:text-amber-400" />}
                      </div>
                      <span className={`text-xs font-semibold leading-tight
                        ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                        {cat.name}
                      </span>
                    </div>
                  </Link>
                );
              })}

              <Link to="/settings?tab=categories&action=new" className="min-h-[48px] flex">
                <div className={`
                  group rounded-xl border-2 border-dashed p-4 flex flex-col items-center justify-center gap-2.5 w-full
                  text-center cursor-pointer transition-all duration-150 btn-tactile
                  hover:shadow-md
                  ${isDark
                    ? 'bg-[#1e293b]/30 border-white/[0.08] hover:border-amber-500/40 hover:bg-amber-500/5'
                    : 'bg-slate-50/50 border-slate-200/80 hover:border-amber-500/40 hover:bg-amber-500/[0.02]'
                  }
                `}>
                  <div className={`
                    h-11 w-11 rounded-md flex items-center justify-center
                    transition-transform duration-150 group-hover:scale-105
                    bg-slate-100 dark:bg-white/[0.05] group-hover:bg-amber-500/10
                  `}>
                    <Plus className="h-5 w-5 text-slate-500 group-hover:text-amber-600 dark:group-hover:text-amber-400" />
                  </div>
                  <span className={`text-xs font-semibold leading-tight
                    text-slate-500 group-hover:text-amber-600 dark:group-hover:text-amber-400`}>
                    Kategori Ekle
                  </span>
                </div>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const FolderIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M20 10a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1h-6.17a1 1 0 0 1-.7-.29l-1.42-1.42a1 1 0 0 0-.7-.29H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h4" />
    <path d="M12 14a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2Z" />
    <path d="M18 18h2" />
  </svg>
);
