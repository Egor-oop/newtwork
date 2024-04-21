import {
  createNavigator,
  useBackButtonIntegration,
  useNavigatorIntegration,
} from '@tma.js/react-router-integration'
import { on } from '@tma.js/sdk'
import { useBackButton, useMiniApp } from '@tma.js/sdk-react'
import { type FC, useEffect, useMemo } from 'react'
import {
  Navigate,
  Route,
  Router,
  Routes,
} from 'react-router-dom'
import type { MiniAppsEventListener } from '@tma.js/sdk'

import { routes } from '~/navigation/routes.tsx'

export const App: FC = () => {
  const tmaNavigator = useMemo(createNavigator, []);
  const [location, navigator] = useNavigatorIntegration(tmaNavigator);
  const backButton = useBackButton();

  const miniApp = useMiniApp()

  useEffect(() => {
    const mode = miniApp.isDark ? 'dark' : 'light'
    const themeListener: MiniAppsEventListener<'theme_changed'> = () => {
      document.body.setAttribute('data-color-scheme', mode)
    };
    on('theme_changed', themeListener)
    document.body.setAttribute('data-color-scheme', mode)
  }, [])

  useBackButtonIntegration(tmaNavigator, backButton);

  return (
    <Router location={location} navigator={navigator}>
      <Routes>
        {routes.map((route) => <Route key={route.path} {...route} />)}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}
