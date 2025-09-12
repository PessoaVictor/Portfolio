class ComponentLoader {
    constructor() {
        this.loadedComponents = new Set();
        this.componentCache = new Map();
    }

    async loadComponent(componentName, targetSelector) {
        try {
            const target = document.querySelector(targetSelector);
            if (!target) {
                console.warn(`Target element not found: ${targetSelector}`);
                return false;
            }

            let componentHTML;
            if (this.componentCache.has(componentName)) {
                componentHTML = this.componentCache.get(componentName);
            } else {
                const response = await fetch(`src/components/${componentName}.html`);
                if (!response.ok) {
                    throw new Error(`Failed to load component: ${componentName}`);
                }
                componentHTML = await response.text();
                this.componentCache.set(componentName, componentHTML);
            }

            target.innerHTML = componentHTML;
            this.loadedComponents.add(componentName);
            
            console.log(`✓ Component loaded: ${componentName}`);
            return true;
        } catch (error) {
            console.error(`✗ Error loading component ${componentName}:`, error);
            return false;
        }
    }

    async loadComponents(components) {
        for (const { name, target } of components) {
            await this.loadComponent(name, target);
        }
    }

    async loadAllComponents() {
        const components = [
            { name: 'header', target: '#header-component' },
            { name: 'hero', target: '#hero-component' },
            { name: 'about', target: '#about-component' },
            { name: 'services', target: '#services-component' },
            { name: 'portfolio', target: '#portfolio-component' },
            { name: 'experience', target: '#experience-component' },
            { name: 'testimonials', target: '#testimonials-component' },
            { name: 'contact', target: '#contact-component' },
            { name: 'footer', target: '#footer-component' }
        ];

        try {
            console.log('🚀 Loading all components...');
            
            const loadPromises = components.map(({ name, target }) => 
                this.loadComponent(name, target)
            );
            
            const results = await Promise.all(loadPromises);
            const successCount = results.filter(Boolean).length;
            
            console.log(`✅ Loaded ${successCount}/${components.length} components successfully`);
            
            this.initializeLoadedComponents();
            
        } catch (error) {
            console.error('❌ Error loading components:', error);
        }
    }

    initializeLoadedComponents() {
        if (typeof AOS !== 'undefined') {
            AOS.refresh();
        }

        this.reinitializeEventListeners();
    }

    reinitializeEventListeners() {
        document.dispatchEvent(new CustomEvent('componentsLoaded', {
            detail: { loadedComponents: Array.from(this.loadedComponents) }
        }));
    }

    isComponentLoaded(componentName) {
        return this.loadedComponents.has(componentName);
    }

    clearComponentCache(componentName) {
        if (componentName) {
            this.componentCache.delete(componentName);
        } else {
            this.componentCache.clear();
        }
    }
}

window.componentLoader = new ComponentLoader();

document.addEventListener('DOMContentLoaded', () => {
    window.componentLoader.loadAllComponents();
});