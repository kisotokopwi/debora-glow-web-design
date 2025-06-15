
import React, { useState } from 'react';
import { useFAQs } from '@/hooks/useFAQs';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const FAQSection = () => {
  const { data: allFAQs = [], isLoading } = useFAQs();
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const categories = [...new Set(allFAQs.map(faq => faq.category))];

  const toggleItem = (id: string) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id);
    } else {
      newOpenItems.add(id);
    }
    setOpenItems(newOpenItems);
  };

  const renderFAQs = (faqs: typeof allFAQs) => (
    <div className="space-y-4">
      {faqs.map((faq) => (
        <Card key={faq.id} className="overflow-hidden">
          <CardContent className="p-0">
            <Button
              variant="ghost"
              className="w-full p-6 text-left justify-between hover:bg-gray-50"
              onClick={() => toggleItem(faq.id)}
            >
              <span className="font-medium text-gray-900">{faq.question}</span>
              {openItems.has(faq.id) ? (
                <ChevronUp className="h-5 w-5 text-gray-500" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-500" />
              )}
            </Button>
            {openItems.has(faq.id) && (
              <div className="px-6 pb-6 text-gray-600 border-t">
                <div className="pt-4" dangerouslySetInnerHTML={{ __html: faq.answer }} />
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="bg-gray-300 h-6 rounded mb-2"></div>
              <div className="bg-gray-300 h-4 rounded w-3/4"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
        <p className="text-gray-600">Find answers to common questions about our products and services</p>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-auto">
          <TabsTrigger value="all">All</TabsTrigger>
          {categories.map((category) => (
            <TabsTrigger key={category} value={category} className="capitalize">
              {category}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="all" className="mt-6">
          {renderFAQs(allFAQs)}
        </TabsContent>

        {categories.map((category) => (
          <TabsContent key={category} value={category} className="mt-6">
            {renderFAQs(allFAQs.filter(faq => faq.category === category))}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default FAQSection;
