import { DesktopNav } from '@/components/layout/desktop-nav';
import { Logo } from '@/components/layout/logo';
import { MobileNav } from '@/components/layout/mobile-nav';
import { ButtonLink } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { primaryNav } from '@/lib/data';

export const Header = () => (
  <header
    className="sticky top-0 z-40 border-b border-hairline bg-canvas/85 backdrop-blur-md"
    data-testid="site-header"
  >
    <Container className="flex h-[4.5rem] items-center justify-between gap-4">
      <Logo />

      <DesktopNav items={primaryNav} />

      <div className="flex items-center gap-2">
        <ButtonLink
          className="hidden lg:inline-flex"
          data-testid="site-header-book-consultation-button"
          href="/contact"
        >
          Book Free Consultation
        </ButtonLink>
        <MobileNav items={primaryNav} />
      </div>
    </Container>
  </header>
);
