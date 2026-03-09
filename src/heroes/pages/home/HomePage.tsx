import {
  Heart,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CustomJumbotron } from "@/components/custom/CustomJumbotron"
import { HeroStats } from "@/heroes/components/HeroStats"
import { HeroGrid } from "@/heroes/components/HeroGrid"
import { useState } from "react"

export const HomePage = () => {

  const [activeTab, setActiveTab] = useState<'all' | 'favorites' | 'heroes' | 'villains'
  >('all');
  return (
    <>
      <>
        {/* Header */}
        <CustomJumbotron
          title="Superheroes Universe"
          description="Discover, explore, and manage your favorite superheroes and villains"
        />

        {/* Stats Dashboard */}
        <HeroStats />

        {/* Tabs */}
        <Tabs value={ activeTab } className="mb-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all" onClick={ () => setActiveTab('all') }>All Characters (16)</TabsTrigger>
            <TabsTrigger value="favorites"
              onClick={ () => setActiveTab('favorites') }
              className="flex items-center gap-2"
            >
              <Heart className="h-4 w-4" />
              Favorites (3)
            </TabsTrigger>
            <TabsTrigger value="heroes" onClick={ () => setActiveTab('heroes') }>Heroes (12)</TabsTrigger>
            <TabsTrigger value="villains" onClick={ () => setActiveTab('villains') }>Villains (2)</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            {/* Show all characters */}
            <h2>All Characters</h2>
            <HeroGrid />
          </TabsContent>
          <TabsContent value="favorites">
            {/* Show favorites characters */}
            <h2>Favorites</h2>
            <HeroGrid />
          </TabsContent>
          <TabsContent value="heroes">
            {/* Show heroes characters */}
            <h2>Heroes</h2>
            <HeroGrid />
          </TabsContent>
          <TabsContent value="villains">
            {/* Show villains characters */}
            <h2>Villains</h2>
            <HeroGrid />
          </TabsContent>
        </Tabs>

        {/* Pagination */}
        <div className="flex items-center justify-center space-x-2">
          <Button variant="outline" size="sm" disabled>
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>

          <Button variant="default" size="sm">
            1
          </Button>
          <Button variant="outline" size="sm">
            2
          </Button>
          <Button variant="outline" size="sm">
            3
          </Button>
          <Button variant="ghost" size="sm" disabled>
            <MoreHorizontal className="h-4 w-4" />
          </Button>

          <Button variant="outline" size="sm">
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </>
    </>
  )
}
