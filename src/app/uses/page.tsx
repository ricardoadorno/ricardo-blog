'use client';

import { motion } from 'framer-motion';
import {
  Code,
  Laptop,
  Monitor,
  Terminal,
  Package,
} from 'lucide-react';
import { MyLink } from '@/components/ui/MyLink';

interface UsesItem {
  name: string;
  description: string;
  url?: string;
  category: string;
}

const usesData: UsesItem[] = [
  // Development Tools
  {
    name: 'Visual Studio Code',
    description: 'My primary code editor with custom theme and extensions',
    url: 'https://code.visualstudio.com',
    category: 'Development Tools',
  },
  {
    name: 'iTerm2 + Oh My Zsh',
    description: 'Terminal emulator with powerlevel10k theme',
    url: 'https://iterm2.com',
    category: 'Development Tools',
  },
  {
    name: 'Git + GitHub',
    description: 'Version control and collaboration platform',
    url: 'https://github.com',
    category: 'Development Tools',
  },
  {
    name: 'Docker',
    description: 'Containerization for development environments',
    url: 'https://www.docker.com',
    category: 'Development Tools',
  },
  {
    name: 'Postman',
    description: 'API development and testing',
    url: 'https://www.postman.com',
    category: 'Development Tools',
  },

  // Hardware
  {
    name: 'MacBook Pro 16" M1 Max',
    description: '32GB RAM, 1TB SSD - My primary development machine',
    category: 'Hardware',
  },
  {
    name: 'Dell UltraSharp 27" 4K Monitor',
    description: 'USB-C hub monitor for productivity',
    category: 'Hardware',
  },
  {
    name: 'Keychron K8 Mechanical Keyboard',
    description: 'Wireless mechanical keyboard with Gateron Brown switches',
    url: 'https://www.keychron.com',
    category: 'Hardware',
  },
  {
    name: 'Logitech MX Master 3',
    description: 'Ergonomic wireless mouse with infinite scroll',
    url: 'https://www.logitech.com',
    category: 'Hardware',
  },
  {
    name: 'Sony WH-1000XM4',
    description: 'Noise-canceling headphones for deep focus sessions',
    category: 'Hardware',
  },

  // Software & Productivity
  {
    name: 'Figma',
    description: 'Design tool for UI/UX mockups and prototypes',
    url: 'https://www.figma.com',
    category: 'Software & Productivity',
  },
  {
    name: 'Notion',
    description: 'All-in-one workspace for notes, docs, and project management',
    url: 'https://www.notion.so',
    category: 'Software & Productivity',
  },
  {
    name: 'Raycast',
    description: 'Blazingly fast launcher and productivity tool',
    url: 'https://www.raycast.com',
    category: 'Software & Productivity',
  },
  {
    name: 'Arc Browser',
    description: 'Modern browser with innovative tab management',
    url: 'https://arc.net',
    category: 'Software & Productivity',
  },
  {
    name: '1Password',
    description: 'Password manager and secure vault',
    url: 'https://1password.com',
    category: 'Software & Productivity',
  },

  // Desk Setup
  {
    name: 'Autonomous SmartDesk Pro',
    description: 'Electric standing desk with memory presets',
    url: 'https://www.autonomous.ai',
    category: 'Desk Setup',
  },
  {
    name: 'Herman Miller Aeron',
    description: 'Ergonomic office chair for long coding sessions',
    category: 'Desk Setup',
  },
  {
    name: 'BenQ ScreenBar Plus',
    description: 'Monitor light bar for eye strain reduction',
    url: 'https://www.benq.com',
    category: 'Desk Setup',
  },
  {
    name: 'Elgato Key Light',
    description: 'Professional LED panel for video calls',
    url: 'https://www.elgato.com',
    category: 'Desk Setup',
  },
];

const categoryIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  'Development Tools': Code,
  Hardware: Laptop,
  'Software & Productivity': Package,
  'Desk Setup': Monitor,
};

const categories = [
  'Development Tools',
  'Hardware',
  'Software & Productivity',
  'Desk Setup',
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export default function UsesPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 via-background to-background py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <motion.div
              initial={{ rotate: -10, scale: 0 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-primary to-purple-600 mb-6"
            >
              <Terminal className="w-10 h-10 text-white" />
            </motion.div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Tools I{' '}
              <span className="text-gradient-primary">Use</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              A comprehensive list of the software, hardware, and tools I use daily
              to build amazing web experiences and stay productive.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="space-y-16">
            {categories.map((category, categoryIndex) => {
              const Icon = categoryIcons[category];
              const items = usesData.filter((item) => item.category === category);

              return (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: categoryIndex * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  {/* Category Header */}
                  <div className="flex items-center gap-3 mb-8">
                    <div className="p-3 rounded-lg bg-primary/10">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h2 className="text-2xl md:text-3xl font-bold">{category}</h2>
                      <p className="text-sm text-muted-foreground">
                        {items.length} {items.length === 1 ? 'item' : 'items'}
                      </p>
                    </div>
                  </div>

                  {/* Items Grid */}
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                  >
                    {items.map((item, index) => (
                      <motion.div key={index} variants={itemVariants}>
                        {item.url ? (
                          <MyLink
                            href={item.url}
                            isExternal
                            externalIcon={false}
                            className="group block h-full"
                          >
                            <div className="h-full p-6 rounded-lg border border-border/50 bg-card/30 backdrop-blur-sm hover:border-primary/50 hover:bg-card/50 hover:shadow-lg transition-all duration-300">
                              <div className="flex items-start justify-between mb-2">
                                <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                                  {item.name}
                                </h3>
                                <span className="text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                                  ↗
                                </span>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                {item.description}
                              </p>
                            </div>
                          </MyLink>
                        ) : (
                          <div className="h-full p-6 rounded-lg border border-border/50 bg-card/30 backdrop-blur-sm">
                            <h3 className="font-semibold text-lg mb-2">{item.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              {item.description}
                            </p>
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Have Questions About My Setup?
            </h2>
            <p className="text-muted-foreground mb-8">
              Feel free to reach out if you&apos;d like to know more about any of these tools
              or want recommendations for your own setup.
            </p>
            <MyLink
              href="/contact"
              variant="button"
              className="inline-flex items-center gap-2"
            >
              Get in Touch
            </MyLink>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
