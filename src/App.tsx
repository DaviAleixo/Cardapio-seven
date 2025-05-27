import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import CategoryFilter from './components/CategoryFilter';
import SearchBar from './components/SearchBar';
import MenuGrid from './components/MenuGrid';
import Footer from './components/Footer';
import { categories, subcategories, menuItems } from './data/menu';

function App() {
  const [activeCategory, setActiveCategory] = useState<string>('food');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredItems, setFilteredItems] = useState(menuItems);

  useEffect(() => {
    filterItems(searchQuery, activeCategory);
  }, [searchQuery, activeCategory]);

  const filterItems = (query: string, category: string | null) => {
    let filtered = menuItems;

    // Filter by search query if provided
    if (query) {
      const lowerCaseQuery = query.toLowerCase();
      filtered = filtered.filter(
        (item) =>
          item.name.toLowerCase().includes(lowerCaseQuery) ||
          item.description.toLowerCase().includes(lowerCaseQuery)
      );
    }

    // Then filter by category if selected
    if (category) {
      filtered = filtered.filter((item) => item.category === category);
    }

    setFilteredItems(filtered);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleCategorySelect = (category: string | null) => {
    setActiveCategory(category || 'food');
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-black">
      <Header />
      
      <main className="flex-grow">
        <div className="container mx-auto px-4 pt-6">
          <SearchBar onSearch={handleSearch} />
        </div>
        
        <CategoryFilter 
          categories={categories} 
          activeCategory={activeCategory} 
          onSelectCategory={handleCategorySelect} 
        />
        
        <section className="py-8">
          <div className="container mx-auto px-4">
            {searchQuery && (
              <div className="mb-6">
                <h2 className="text-xl font-medium">
                  {filteredItems.length === 0
                    ? `Nenhum resultado para "${searchQuery}"`
                    : `Resultados para "${searchQuery}" (${filteredItems.length})`}
                </h2>
              </div>
            )}
            
            <MenuGrid 
              items={filteredItems} 
              subcategories={subcategories}
              activeCategory={activeCategory}
            />
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}

export default App;