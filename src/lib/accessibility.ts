// Accessibility utilities for production

export const trapFocus = (element: HTMLElement): (() => void) => {
  const focusableElements = element.querySelectorAll(
    'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
  );
  
  const firstElement = focusableElements[0] as HTMLElement;
  const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

  const handleTab = (e: KeyboardEvent) => {
    if (e.key !== 'Tab') return;

    if (e.shiftKey) {
      if (document.activeElement === firstElement) {
        lastElement.focus();
        e.preventDefault();
      }
    } else {
      if (document.activeElement === lastElement) {
        firstElement.focus();
        e.preventDefault();
      }
    }
  };

  element.addEventListener('keydown', handleTab);
  
  return () => {
    element.removeEventListener('keydown', handleTab);
  };
};

export const announceToScreenReader = (message: string, priority: 'polite' | 'assertive' = 'polite') => {
  const announcement = document.createElement('div');
  announcement.setAttribute('role', 'status');
  announcement.setAttribute('aria-live', priority);
  announcement.setAttribute('aria-atomic', 'true');
  announcement.className = 'sr-only';
  announcement.textContent = message;
  
  document.body.appendChild(announcement);
  
  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 1000);
};

export const getAriaLabel = (element: HTMLElement): string => {
  return (
    element.getAttribute('aria-label') ||
    element.getAttribute('aria-labelledby') ||
    element.textContent ||
    ''
  );
};

export const setFocusableState = (element: HTMLElement, focusable: boolean) => {
  if (focusable) {
    element.removeAttribute('tabindex');
    element.removeAttribute('aria-hidden');
  } else {
    element.setAttribute('tabindex', '-1');
    element.setAttribute('aria-hidden', 'true');
  }
};
