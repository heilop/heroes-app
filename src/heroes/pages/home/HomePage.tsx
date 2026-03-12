import { useMemo } from "react"
import { useSearchParams } from "react-router"
import { useQuery } from "@tanstack/react-query"

import { Heart } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CustomJumbotron } from "@/components/custom/CustomJumbotron"
import { HeroStats } from "@/heroes/components/HeroStats"
import { HeroGrid } from "@/heroes/components/HeroGrid"
import { CustomPagination } from "@/components/custom/CustomPagination"
import CustomBreadCrumb from "@/components/custom/CustomBreadcrumbs"
import { getHeroresByPageAction } from "@/heroes/actions/get-heroes-by-page.action"

export const HomePage = () => {

  const [searchParams, setSearchParams] = useSearchParams();

  const activeTab = searchParams.get('tab') ?? 'all';
  const page = Number(searchParams.get('page') ?? '1');
  const limit = Number(searchParams.get('limit') ?? '6');

  const selectedTab = useMemo(() => {
    const validTabs = ['all', 'favorites', 'heroes', 'villains'];
    return validTabs.includes(activeTab) ? activeTab : 'all';
  }, [activeTab]);

  // const [activeTab, setActiveTab] = useState<'all' | 'favorites' | 'heroes' | 'villains'
  //   >('all');

  const { data: heroesResponse } = useQuery({
    queryKey: ['heroes', { limit, page }],
    queryFn: () => getHeroresByPageAction(page, limit),
    staleTime: 1000 * 60 * 5,
  });

  // useEffect(() => {
  //   getHeroresByPageAction().then();
  // }, []);

  return (
    <>
      <>
        {/* Header */}
        <CustomJumbotron
          title="Superheroes Universe"
          description="Discover, explore, and manage your favorite superheroes and villains"
        />

        <CustomBreadCrumb currentPage='Super Heroes' />

        {/* Stats Dashboard */}
        <HeroStats />

        {/* Tabs */}
        <Tabs value={ selectedTab } className="mb-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger
              value="all"
              onClick={() => {
                setSearchParams((prev) => {
                  prev.set('tab', 'all');
                  return prev;
                })
              }}
            >
              All Characters ({ heroesResponse?.total ?? 0 })
            </TabsTrigger>
            <TabsTrigger
              value="favorites"
              onClick={() => {
                setSearchParams((prev) => {
                  prev.set('tab', 'favorites');
                  return prev;
                })
              }}
              className="flex items-center gap-2"
            >
              <Heart className="h-4 w-4" />
              Favorites (3)
            </TabsTrigger>
            <TabsTrigger
              value="heroes"
              onClick={() => {
                setSearchParams((prev) => {
                  prev.set('tab', 'heroes');
                  return prev;
                })
              }}
            >
              Heroes (12)
            </TabsTrigger>
            <TabsTrigger
              value="villains"
              onClick={() => {
                setSearchParams((prev) => {
                  prev.set('tab', 'all');
                  return prev;
                })
              }}
            >
              Villains (2)
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            {/* Show all characters */}
            <h2>All Characters</h2>
            <HeroGrid heroes={heroesResponse?.heroes ?? []}  />
          </TabsContent>
          <TabsContent value="favorites">
            {/* Show favorites characters */}
            <h2>Favorites</h2>
            <HeroGrid heroes={[]} />
          </TabsContent>
          <TabsContent value="heroes">
            {/* Show heroes characters */}
            <h2>Heroes</h2>
            <HeroGrid heroes={[]} />
          </TabsContent>
          <TabsContent value="villains">
            {/* Show villains characters */}
            <h2>Villains</h2>
            <HeroGrid heroes={[]} />
          </TabsContent>
        </Tabs>

        {/* Pagination */}
        <CustomPagination totalPages={heroesResponse?.pages ?? 1}  />
      </>
    </>
  )
}
