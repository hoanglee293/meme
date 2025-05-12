"use client";
import {
  Loader2,
  Rocket,
  Search,
} from "lucide-react";
import { useWsSubscribeTokens } from "@/hooks/useWsSubscribeTokens";
import { useState, useEffect } from "react";
import { SolonaTokenService } from "@/services/api";
import { useLang } from "@/lang/useLang";
import { useRouter } from "next/navigation";
import { useDebounce } from "@/hooks/useDebounce";
import { Input } from "@/ui/input";
import { useAuth } from "@/hooks/useAuth";
import { ToastNotification } from "@/ui/toast";
import TokenCard from "../components/dashboard/Card";
import { useWsSubscribeTokensFlash } from "@/hooks/useWsSubscribeTokensFlash";
import CardFlash from "../components/dashboard/CardFlash";

export default function Dashboard() {
  const { t } = useLang();
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  const [isSearching, setIsSearching] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { tokens: wsTokens } = useWsSubscribeTokens({ limit: 18 });
  const [showNotification, setShowNotification] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const { tokens: tokensFlash } = useWsSubscribeTokensFlash({
    limit: 9,
  });

  const [tokens, setTokens] = useState<
    {
      id: number;
      name: string;
      symbol: string;
      address: string;
      decimals: number;
      logoUrl: string;
      coingeckoId: string | null;
      tradingviewSymbol: string | null;
      isVerified: boolean;
      marketCap: number;
    }[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchResults, setSearchResults] = useState<
    {
      id: number;
      name: string;
      symbol: string;
      address: string;
      decimals: number;
      logoUrl: string;
      coingeckoId: string | null;
      tradingviewSymbol: string | null;
      isVerified: boolean;
      marketCap: number;
    }[]
  >([]);

  useEffect(() => {
    if (showNotification) {
      const timer = setTimeout(() => {
        setShowNotification(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showNotification]);


  // Update tokens when WebSocket data changes
  useEffect(() => {
    if (wsTokens && wsTokens.length > 0) {
      setTokens(wsTokens);
      setIsLoading(false);
    }
  }, [wsTokens]);

  // Fetch initial tokens if WebSocket is not providing data
  useEffect(() => {
    const fetchTokens = async () => {
      try {
        const response = await SolonaTokenService.getSearchTokenInfor("");
        if (response && response.tokens) {
          setTokens(response.tokens);
        }
      } catch (error) {
        console.error("Error fetching tokens:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (tokens.length === 0) {
      fetchTokens();
    }
  }, [tokens.length]);

  // Effect to handle search when debounced value changes
  useEffect(() => {
    const searchData = async () => {
      if (!debouncedSearchQuery.trim()) {
        setSearchResults([]);
        setIsSearching(false);
        setCurrentPage(1);
        setTotalPages(1);
        return;
      }
      setIsSearching(true);
      try {
        const res = await SolonaTokenService.getSearchTokenInfor(
          debouncedSearchQuery,
          currentPage,
          18
        );
        setSearchResults(res.tokens || []);
        setTotalPages(Math.ceil(res.total / 18));
      } catch (error) {
        console.error("Error searching tokens:", error);
        setSearchResults([]);
        setTotalPages(1);
      } finally {
        setIsSearching(false);
      }
    };

    searchData();
  }, [debouncedSearchQuery, currentPage, isAuthenticated]);

  // Use search results if available, otherwise use WebSocket data
  const displayTokens = debouncedSearchQuery.trim() ? searchResults : tokens;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="container mx-auto p-6">
      {showNotification && (
        <ToastNotification
          message={t("createCoin.pleaseConnectWallet")}
          duration={3000}
          onClose={() => setShowNotification(false)}
        />
      )}
      <div className="mt-8 mb-12">
      
        {isLoading || (!debouncedSearchQuery.trim() && tokens.length === 0) ? (
          <div className="flex justify-center items-center h-40">
            <Loader2 color="#eab308" className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : displayTokens.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 3xl:grid-cols-6 gap-6">
              {displayTokens.map((token, index) => {
                // Skip last 2 tokens when screen width is between 1280px and 1800px
                if ( !searchQuery && (window.innerWidth >= 1280 && window.innerWidth < 1800) && index >= displayTokens.length - 2) {
                  return null;
                }
                return (
                  <TokenCard
                    key={index}
                    token={token}
                    index={index}
                    isHovered={hoveredCard === index}
                    onMouseEnter={() => setHoveredCard(index)}
                    onMouseLeave={() => setHoveredCard(null)}
                    onTradeClick={() =>
                      router.push(`/trading/token?address=${token.address}`)
                    }
                    isBlinking={true}
                  />
                );
              })}
            </div>
            {debouncedSearchQuery.trim() && totalPages > 1 && (
              <div className="flex justify-center mt-6">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handlePageChange(1)}
                    disabled={currentPage === 1}
                    className="px-3 py-1 rounded-md bg-muted hover:bg-muted/80 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    «
                  </button>
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-3 py-1 rounded-md bg-muted hover:bg-muted/80 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    ‹
                  </button>

                  {currentPage > 2 && (
                    <button
                      onClick={() => handlePageChange(1)}
                      className="px-3 py-1 rounded-md bg-muted hover:bg-muted/80"
                    >
                      1
                    </button>
                  )}
                  {currentPage > 3 && <span className="px-2">...</span>}

                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let page;
                    if (currentPage <= 3) {
                      page = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      page = totalPages - 4 + i;
                    } else {
                      page = currentPage - 2 + i;
                    }
                    return page;
                  }).map((page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`px-3 py-1 rounded-md ${
                        currentPage === page
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted hover:bg-muted/80"
                      }`}
                    >
                      {page}
                    </button>
                  ))}

                  {currentPage < totalPages - 2 && (
                    <span className="px-2">...</span>
                  )}
                  {currentPage < totalPages - 1 && (
                    <button
                      onClick={() => handlePageChange(totalPages)}
                      className="px-3 py-1 rounded-md bg-muted hover:bg-muted/80"
                    >
                      {totalPages}
                    </button>
                  )}

                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 rounded-md bg-muted hover:bg-muted/80 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    ›
                  </button>
                  <button
                    onClick={() => handlePageChange(totalPages)}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 rounded-md bg-muted hover:bg-muted/80 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    »
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="text-center text-muted-foreground py-8">
            {t("dashboard.cryptocurrencies.no_tokens")}
          </div>
        )}
      </div>
    </div>
  );
}
