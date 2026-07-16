import { useState, useRef, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getProductById, deleteProduct, getCategories } from '../api/products';
import { getStockMovements, addStockMovement } from '../api/stockMovements';
import { useAuth } from '../context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '../components/ui/dialog';
import { Skeleton } from '../components/ui/skeleton';
import { ArrowLeft, Edit, Trash2, Plus, Minus, History, AlertTriangle } from 'lucide-react';
import { useTheme } from '../context/ThemeProvider';

export const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const productId = Number(id);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [stockChange, setStockChange] = useState<number>(0);
  const [stockReason, setStockReason] = useState<string>('');
  const [isStockDialogOpen, setIsStockDialogOpen] = useState(false);
  const [changeType, setChangeType] = useState<'add' | 'remove'>('add');

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [undoCountdown, setUndoCountdown] = useState<number | null>(null);
  const intervalRef = useRef<any>(null);

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const handleDeleteTrigger = () => {
    setIsDeleteDialogOpen(false);
    setUndoCountdown(5);

    intervalRef.current = setInterval(() => {
      setUndoCountdown((prev: number | null) => {
        if (prev === null || prev <= 1) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
          deleteMutation.mutate();
          return null;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleUndo = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setUndoCountdown(null);
  };

  const { data: product, isLoading } = useQuery({
    queryKey: ['product', productId],
    queryFn: () => getProductById(productId),
  });

  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  });

  const { data: movements } = useQuery({
    queryKey: ['stockMovements', productId],
    queryFn: () => getStockMovements(productId),
  });

  const category = categories?.find(c => c.id === product?.categoryId);

  const deleteMutation = useMutation({
    mutationFn: () => deleteProduct(productId),
    onSuccess: () => {
      queryClient.invalidateQueries();
      navigate(product?.categoryId ? `/category/${product.categoryId}` : '/');
    },
  });

  const stockMutation = useMutation({
    mutationFn: (amount: number) => addStockMovement(productId, amount, user?.username || 'Bilinmeyen', stockReason, product?.version),
    onSuccess: () => {
      queryClient.invalidateQueries();
      setIsStockDialogOpen(false);
      setStockChange(0);
      setStockReason('');
      
      // Haptic Feedback
      if (typeof navigator !== 'undefined' && navigator.vibrate) {
        navigator.vibrate(50);
      }
    },
    onError: (error: any) => {
      alert(error.response?.data?.error || 'Stok güncellenirken hata oluştu');
      queryClient.invalidateQueries({ queryKey: ['product', productId] }); // refetch to get fresh version
    }
  });

  const handleStockUpdate = () => {
    if (stockChange <= 0) return;
    const amount = changeType === 'add' ? stockChange : -stockChange;
    stockMutation.mutate(amount);
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <Skeleton className="h-10 w-10 rounded-md" />
          <div className="space-y-2">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-32" />
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <Skeleton className="h-64 w-full rounded-xl" />
            <Skeleton className="h-48 w-full rounded-xl" />
          </div>
          <div className="space-y-6">
            <Skeleton className="h-40 w-full rounded-xl" />
          </div>
        </div>
      </div>
    );
  }
  
  if (!product) return <div className="text-center py-12 text-slate-500">Ürün bulunamadı</div>;

  const isLowStock = product.stockQuantity <= (product.minimumStock || 0);

  if (undoCountdown !== null) {
    return (
      <div className="max-w-4xl mx-auto flex flex-col items-center justify-center min-h-[50vh] space-y-6">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 mb-4">
            <Trash2 className="w-10 h-10 animate-pulse" />
          </div>
          <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>Ürün Siliniyor</h2>
          <p className={`text-lg ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            <span className="font-mono font-bold text-red-500">{undoCountdown}</span> saniye içinde tamamen silinecek.
          </p>
          <Button 
            variant="outline" 
            size="lg" 
            onClick={handleUndo}
            className="mt-6 border-slate-300 hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800 h-14 px-8 text-lg rounded-full"
          >
            Geri Al
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 anim-number-tick pb-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="h-12 w-12 rounded-xl btn-tactile">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className={`text-2xl font-bold font-mono tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>{product.productCode}</h1>
            <p className={`text-sm font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              {category?.name} 
              {product.attributes?.package ? ` • ${product.attributes.package}` : ''}
              {product.attributes?.packageCode ? ` • ${product.attributes.packageCode}` : ''}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" asChild className="h-12 rounded-md btn-tactile px-4 border">
            <Link to={`/product/${product.id}/edit`}>
              <Edit className="mr-2 h-4 w-4" /> Düzenle
            </Link>
          </Button>
          <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="destructive" className="h-12 rounded-md btn-tactile px-4">
                <Trash2 className="mr-2 h-4 w-4" /> Sil
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Ürünü Sil</DialogTitle>
              </DialogHeader>
              <p className="text-slate-600 dark:text-slate-400">Bu ürünü silmek istediğinize emin misiniz? Bu işlem geri alınamaz.</p>
              <DialogFooter className="gap-2">
                <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)} className="h-11 rounded-md">İptal</Button>
                <Button variant="destructive" onClick={handleDeleteTrigger} className="h-11 rounded-md">
                  Evet, Sil
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Sol Kolon - Bilgiler */}
        <div className="md:col-span-2 space-y-6">
          <Card className={`rounded-xl border shadow-sm transition-all duration-150
            ${isDark
              ? 'bg-[#1e293b] border-white/[0.07]'
              : 'bg-white border-slate-200/80 shadow-slate-900/[0.03]'
            }`}>
            <CardHeader>
              <CardTitle className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}>Ürün Detayları</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              {product.description && (
                <div className={`p-4 rounded-md border ${isDark ? 'bg-slate-800/40 border-white/[0.05]' : 'bg-slate-50/50 border-slate-200/50'}`}>
                  <h4 className={`text-sm font-semibold mb-1.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Açıklama</h4>
                  <p className={`leading-relaxed text-sm ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>{product.description}</p>
                </div>
              )}
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-5 pt-2">
                <div>
                  <h4 className={`text-xs font-semibold uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Konum</h4>
                  <p className={`text-sm font-bold mt-1.5 font-mono ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>{product.location || '-'}</p>
                </div>
                <div>
                  <h4 className={`text-xs font-semibold uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Malzeme Kodu</h4>
                  <p className={`text-sm font-bold mt-1.5 font-mono ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>{product.materialCode || '-'}</p>
                </div>
                <div>
                  <h4 className={`text-xs font-semibold uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Eklenme Tarihi</h4>
                  <p className={`text-sm font-bold mt-1.5 font-mono ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>{new Date(product.createdAt).toLocaleDateString('tr-TR')}</p>
                </div>
                
                {/* DİNAMİK ALANLAR */}
                {category?.formSchema && Array.isArray(category.formSchema) && category.formSchema.map((field: any) => {
                  const value = product.attributes?.[field.name];
                  return (
                    <div key={field.name}>
                      <h4 className={`text-xs font-semibold uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{field.label}</h4>
                      <p className={`text-sm font-bold mt-1.5 font-mono ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                        {value !== undefined && value !== null ? String(value) : '-'}
                      </p>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Stok Hareketleri */}
          <Card className={`rounded-xl border shadow-sm transition-all duration-150
            ${isDark
              ? 'bg-[#1e293b] border-white/[0.07]'
              : 'bg-white border-slate-200/80 shadow-slate-900/[0.03]'
            }`}>
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <CardTitle className={`text-lg font-bold flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-800'}`}>
                <History className="h-5 w-5 text-amber-600 dark:text-amber-500" /> Stok Geçmişi
              </CardTitle>
            </CardHeader>
            <CardContent>
              {movements && movements.length > 0 ? (
                <div className="space-y-4">
                  {movements.map((movement) => (
                    <div key={movement.id} className={`flex justify-between items-center py-3 border-b last:border-0 hover:bg-slate-50/50 dark:hover:bg-slate-800/30 px-3 -mx-3 rounded-md transition-colors ${isDark ? 'border-white/[0.05]' : 'border-slate-100'}`}>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className={`font-mono font-bold ${movement.changeAmount > 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>
                            {movement.changeAmount > 0 ? '+' : ''}{movement.changeAmount}
                          </span>
                          <span className={`text-sm font-semibold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>{movement.userName}</span>
                        </div>
                        {movement.reason && <p className={`text-xs mt-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{movement.reason}</p>}
                      </div>
                      <div className={`text-xs font-mono font-medium ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                        {new Date(movement.createdAt).toLocaleString('tr-TR')}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-slate-500 py-6 text-center italic">Henüz stok hareketi bulunmuyor.</p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sağ Kolon - Stok İşlemleri */}
        <div className="space-y-6">
          <Card className={`rounded-xl border shadow-md transition-all duration-150
            ${isLowStock 
              ? 'border-red-200 dark:border-red-900/50 bg-red-50/10 dark:bg-red-950/10' 
              : isDark ? 'bg-[#1e293b] border-white/[0.07]' : 'bg-white border-slate-200/80 shadow-slate-900/[0.03]'
            }`}>
            <CardContent className="p-8 text-center">
              {isLowStock && (
                <div className="flex items-center justify-center gap-2 text-red-600 dark:text-red-400 mb-3 bg-red-100 dark:bg-red-900/30 py-1.5 px-3 rounded-full w-fit mx-auto">
                  <AlertTriangle className="h-4 w-4" />
                  <span className="font-bold text-xs uppercase tracking-wider">Kritik Stok Uyarısı</span>
                </div>
              )}
              <h3 className={`text-xs font-semibold uppercase tracking-widest mb-3 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Mevcut Stok</h3>
              <div className={`text-6xl font-bold font-mono tracking-tighter mb-4 anim-number-tick ${isLowStock ? 'text-red-600 dark:text-red-400' : isDark ? 'text-white' : 'text-slate-900'}`}>
                {product.stockQuantity}
              </div>
              <div className="flex justify-center gap-2 mb-6">
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="h-12 w-12 rounded-full border-slate-300 text-slate-600 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800 btn-tactile" 
                  onClick={() => stockMutation.mutate(-1)} 
                  disabled={product.stockQuantity <= 0 || stockMutation.isPending} 
                  title="Hızlı -1"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="h-12 w-12 rounded-full border-slate-300 text-slate-600 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800 btn-tactile" 
                  onClick={() => stockMutation.mutate(1)} 
                  disabled={stockMutation.isPending} 
                  title="Hızlı +1"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex flex-col gap-3 w-full">
                <Dialog open={isStockDialogOpen} onOpenChange={setIsStockDialogOpen}>
                  <DialogTrigger asChild>
                    <Button 
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white h-12 btn-tactile rounded-md"
                      onClick={() => setChangeType('add')}
                    >
                      <Plus className="mr-2 h-4 w-4 shrink-0" /> Giriş
                    </Button>
                  </DialogTrigger>
                  <DialogTrigger asChild>
                    <Button 
                      variant="outline" 
                      className="w-full border-red-200 text-red-600 hover:bg-red-50 dark:border-red-900/50 dark:text-red-400 dark:hover:bg-red-900/20 h-12 btn-tactile rounded-md"
                      onClick={() => setChangeType('remove')}
                    >
                      <Minus className="mr-2 h-4 w-4 shrink-0" /> Çıkış
                    </Button>
                  </DialogTrigger>

                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>
                        Stok {changeType === 'add' ? 'Girişi' : 'Çıkışı'} Yap
                      </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Miktar</label>
                        <Input 
                          type="number" 
                          min="1"
                          /* text-base (16px) prevents iOS automatic zoom on focus */
                          className="h-12 text-base rounded-sm"
                          value={stockChange || ''} 
                          onChange={(e) => setStockChange(Number(e.target.value))} 
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Sebep / Not (Opsiyonel)</label>
                        <Input 
                          value={stockReason} 
                          /* text-base (16px) prevents iOS automatic zoom on focus */
                          className="h-12 text-base rounded-sm"
                          onChange={(e) => setStockReason(e.target.value)} 
                          placeholder="Örn: Proje için kullanıldı"
                        />
                      </div>
                    </div>
                    <DialogFooter className="gap-2">
                      <Button variant="outline" onClick={() => setIsStockDialogOpen(false)} className="h-11">İptal</Button>
                      <Button 
                        onClick={handleStockUpdate} 
                        disabled={stockChange <= 0 || stockMutation.isPending}
                        className={`h-11 ${changeType === 'add' ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-red-600 hover:bg-red-700'} text-white`}
                      >
                        {stockMutation.isPending ? 'Kaydediliyor...' : 'Onayla'}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
