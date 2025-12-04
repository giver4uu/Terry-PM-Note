# COMP-003: React Development

**작성일:** 2025-11-26
**작성자:** Terry (PM)
**검토자:** Berry (CTO), Borry (HR)
**상태:** Draft
**카테고리:** TECHNICAL
**우선순위:** Priority 3 (V1 핵심)

---

## 📋 기본 정보

### Competency ID
`COMP-003`

### Competency Name
**영어:** React Development
**한국어:** React 개발

### 한 문장 정의
React 라이브러리를 사용하여 컴포넌트 기반의 인터랙티브한 사용자 인터페이스를 설계하고 구현하는 능력

### 상세 설명
단순히 React 문법을 아는 것이 아니라, 컴포넌트 설계 원칙(단일 책임, 재사용성, 조합성)을 이해하고 Hooks(useState, useEffect, useContext 등)를 효과적으로 사용하여 복잡한 UI 로직을 관리하는 역량입니다. 성능 최적화(React.memo, useMemo, Code Splitting), 접근성(a11y), 테스트 가능한 컴포넌트 설계까지 End-to-End로 수행할 수 있습니다. Advanced 단계에서는 Design System 구축, 복잡한 상태 패턴(Compound Components, Render Props), SSR/SSG 같은 고급 주제를 다룹니다.

---

## 🎯 Behavioral Indicators (행동적 지표)

이 역량을 가진 사람은 다음과 같은 행동을 보입니다:

1. **컴포넌트 분리:** UI를 논리적 단위로 분해하여 재사용 가능한 컴포넌트 설계 (단일 책임 원칙)
2. **Hooks 활용:** useState, useEffect, useContext, useCallback, useMemo를 적절한 상황에 사용
3. **Props Drilling 회피:** Context API 또는 상태 관리 라이브러리로 깊은 Props 전달 문제 해결
4. **성능 최적화:** React.memo, useMemo, useCallback으로 불필요한 리렌더링 방지
5. **조건부 렌더링:** &&, 삼항 연산자, Early Return 패턴으로 조건에 따른 UI 렌더링
6. **리스트 렌더링:** map()으로 배열 렌더링, key prop 적절히 사용
7. **Side Effect 관리:** useEffect로 API 호출, 타이머, 이벤트 리스너 관리, cleanup 함수 작성
8. **접근성 고려:** semantic HTML, ARIA 속성, 키보드 네비게이션 지원

---

## 📊 Proficiency Levels (숙련도 레벨)

### Beginner (초급) ⭐ Full-stack Base Competency

**행동적 설명:**
React의 기본 개념(컴포넌트, JSX, Props, State)을 이해하고, 튜토리얼이나 기존 코드를 참고하여 간단한 UI 컴포넌트를 작성할 수 있습니다. useState와 useEffect를 사용하지만, Hooks의 동작 원리나 성능 최적화는 시니어의 가이드가 필요합니다.

**구체적 예시:**
- 함수형 컴포넌트 작성 (class 컴포넌트는 생소)
- useState로 간단한 상태 관리 (카운터, 토글)
- useEffect로 API 호출 (dependency array 이해 부족)
- 조건부 렌더링 (&&, 삼항 연산자)
- 리스트 렌더링 (map, key)
- Props로 데이터 전달 (부모 → 자식)

**코드 예시:**
```jsx
// Beginner: 간단한 카운터 컴포넌트
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(count - 1)}>Decrement</button>
    </div>
  );
}

export default Counter;
```

```jsx
// Beginner: 사용자 목록 표시 (API 호출)
import React, { useState, useEffect } from 'react';

function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('/api/users')
      .then(res => res.json())
      .then(data => setUsers(data));
  }, []);  // 빈 배열 = mount 시에만 실행 (이해 부족)

  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>  // key 사용 (왜 필요한지는 모름)
      ))}
    </ul>
  );
}
```

**한계:**
- useEffect dependency array 이해 부족 (무한 루프 발생 가능)
- key prop을 index로 사용 (잘못된 패턴)
- 컴포넌트가 너무 큼 (단일 책임 원칙 위반)
- 에러 처리 없음 (API 호출 실패 시)
- 성능 최적화 없음 (불필요한 리렌더링)

---

### Intermediate (중급) ⭐ Frontend Engineer Base Competency

**행동적 설명:**
React의 핵심 개념(Virtual DOM, Reconciliation, Hooks 동작 원리)을 이해하고, 복잡한 UI 로직을 효율적으로 구현할 수 있습니다. 컴포넌트를 적절히 분리하고, Custom Hooks로 로직을 재사용하며, React.memo와 useCallback으로 기본적인 성능 최적화를 수행합니다. React Router, Form Handling, Error Boundary 같은 실무 패턴을 적용할 수 있습니다.

**구체적 예시:**
- 컴포넌트 분리 원칙 적용 (Container/Presenter 패턴)
- Custom Hooks 작성 (useFetch, useForm, useAuth)
- useCallback, useMemo로 성능 최적화
- Context API로 전역 상태 관리 (Props Drilling 회피)
- React Router로 SPA 라우팅
- Form 라이브러리 (React Hook Form) 사용
- Error Boundary로 에러 처리
- Controlled vs Uncontrolled Components 이해

**코드 예시 (Todo App with Custom Hook):**
```jsx
// Intermediate: Custom Hook으로 API 호출 로직 재사용
import { useState, useEffect } from 'react';

function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;  // cleanup 패턴

    fetch(url)
      .then(res => {
        if (!res.ok) throw new Error('Network error');
        return res.json();
      })
      .then(data => {
        if (isMounted) {
          setData(data);
          setLoading(false);
        }
      })
      .catch(err => {
        if (isMounted) {
          setError(err.message);
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;  // cleanup: unmount 시 상태 업데이트 방지
    };
  }, [url]);  // url 변경 시 재실행

  return { data, loading, error };
}

// 사용
function TodoList() {
  const { data: todos, loading, error } = useFetch('/api/todos');

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <ul>
      {todos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
}

function TodoItem({ todo }) {
  const [isCompleted, setIsCompleted] = useState(todo.completed);

  const handleToggle = useCallback(() => {
    fetch(`/api/todos/${todo.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: !isCompleted })
    });
    setIsCompleted(!isCompleted);
  }, [todo.id, isCompleted]);  // dependency array 정확히 관리

  return (
    <li style={{ textDecoration: isCompleted ? 'line-through' : 'none' }}>
      <input
        type="checkbox"
        checked={isCompleted}
        onChange={handleToggle}
      />
      {todo.title}
    </li>
  );
}
```

**Context API 예시 (전역 상태):**
```jsx
// Intermediate: Context API로 Props Drilling 회피

import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = (email, password) => {
    // API 호출
    fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
      .then(res => res.json())
      .then(data => setUser(data.user));
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}

// 사용
function App() {
  return (
    <AuthProvider>
      <Header />
      <Main />
    </AuthProvider>
  );
}

function Header() {
  const { user, logout } = useAuth();  // Props 전달 없이 직접 접근

  return (
    <header>
      {user ? (
        <>
          <span>Welcome, {user.name}</span>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <LoginButton />
      )}
    </header>
  );
}
```

**성능 최적화 예시:**
```jsx
// Intermediate: React.memo, useCallback으로 불필요한 리렌더링 방지

import React, { useState, useCallback, memo } from 'react';

function TodoApp() {
  const [todos, setTodos] = useState([]);

  // useCallback: 함수 재생성 방지
  const addTodo = useCallback((title) => {
    setTodos(prev => [...prev, { id: Date.now(), title, completed: false }]);
  }, []);

  const toggleTodo = useCallback((id) => {
    setTodos(prev => prev.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  }, []);

  return (
    <div>
      <AddTodoForm onAdd={addTodo} />
      {todos.map(todo => (
        <TodoItem key={todo.id} todo={todo} onToggle={toggleTodo} />
      ))}
    </div>
  );
}

// React.memo: props가 변경되지 않으면 리렌더링 스킵
const TodoItem = memo(({ todo, onToggle }) => {
  console.log('TodoItem rendered:', todo.id);  // 확인용

  return (
    <li>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
      />
      {todo.title}
    </li>
  );
});

// AddTodoForm도 React.memo로 최적화
const AddTodoForm = memo(({ onAdd }) => {
  const [title, setTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      onAdd(title);
      setTitle('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add a todo"
      />
      <button type="submit">Add</button>
    </form>
  );
});
```

---

### Advanced (고급)

**행동적 설명:**
복잡한 UI 패턴(Compound Components, Render Props, HOC)을 적용하고, Design System을 구축하며, SSR/SSG 같은 렌더링 전략을 평가합니다. Code Splitting, Lazy Loading으로 번들 크기를 최적화하고, Suspense와 Error Boundary로 로딩/에러 상태를 선언적으로 관리합니다. React 내부 동작(Fiber, Reconciliation)을 이해하고 주니어 개발자를 멘토링할 수 있습니다.

**구체적 예시:**
- Compound Components 패턴 (탭, 모달 같은 복합 컴포넌트)
- Render Props 패턴
- HOC (Higher-Order Components)
- Design System (Storybook으로 컴포넌트 문서화)
- Code Splitting (React.lazy, dynamic import)
- Suspense로 로딩 상태 관리
- SSR (Next.js), SSG (Static Site Generation)
- React DevTools Profiler로 성능 분석
- TypeScript + React

**코드 예시 (Compound Components - 탭):**
```jsx
// Advanced: Compound Components 패턴

import React, { createContext, useContext, useState } from 'react';

const TabContext = createContext();

function Tabs({ children, defaultTab }) {
  const [activeTab, setActiveTab] = useState(defaultTab);

  return (
    <TabContext.Provider value={{ activeTab, setActiveTab }}>
      <div className="tabs">{children}</div>
    </TabContext.Provider>
  );
}

function TabList({ children }) {
  return <div className="tab-list">{children}</div>;
}

function Tab({ id, children }) {
  const { activeTab, setActiveTab } = useContext(TabContext);

  return (
    <button
      className={`tab ${activeTab === id ? 'active' : ''}`}
      onClick={() => setActiveTab(id)}
    >
      {children}
    </button>
  );
}

function TabPanels({ children }) {
  return <div className="tab-panels">{children}</div>;
}

function TabPanel({ id, children }) {
  const { activeTab } = useContext(TabContext);

  return activeTab === id ? <div className="tab-panel">{children}</div> : null;
}

// Public API
Tabs.List = TabList;
Tabs.Tab = Tab;
Tabs.Panels = TabPanels;
Tabs.Panel = TabPanel;

export default Tabs;

// 사용 (매우 직관적!)
function App() {
  return (
    <Tabs defaultTab="profile">
      <Tabs.List>
        <Tabs.Tab id="profile">Profile</Tabs.Tab>
        <Tabs.Tab id="settings">Settings</Tabs.Tab>
        <Tabs.Tab id="billing">Billing</Tabs.Tab>
      </Tabs.List>

      <Tabs.Panels>
        <Tabs.Panel id="profile">
          <h2>Profile</h2>
          <p>Your profile information</p>
        </Tabs.Panel>
        <Tabs.Panel id="settings">
          <h2>Settings</h2>
          <p>Your settings</p>
        </Tabs.Panel>
        <Tabs.Panel id="billing">
          <h2>Billing</h2>
          <p>Your billing information</p>
        </Tabs.Panel>
      </Tabs.Panels>
    </Tabs>
  );
}
```

**Code Splitting 예시:**
```jsx
// Advanced: React.lazy로 Code Splitting

import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Lazy Loading: 각 페이지를 별도 번들로 분리
const Home = lazy(() => import('./pages/Home'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Profile = lazy(() => import('./pages/Profile'));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

// 결과: 초기 번들 크기 500KB → 150KB (70% 감소)
// 각 페이지는 필요할 때만 로드
```

**Render Props 패턴 예시:**
```jsx
// Advanced: Render Props로 로직 재사용

function MouseTracker({ render }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return render(position);  // render prop으로 UI 위임
}

// 사용 1: 마우스 좌표 표시
function App1() {
  return (
    <MouseTracker render={({ x, y }) => (
      <h1>Mouse position: {x}, {y}</h1>
    )} />
  );
}

// 사용 2: 마우스를 따라다니는 고양이
function App2() {
  return (
    <MouseTracker render={({ x, y }) => (
      <img
        src="/cat.png"
        style={{ position: 'absolute', left: x, top: y }}
        alt="cat"
      />
    )} />
  );
}
```

---

### Expert (전문가)

**행동적 설명:**
조직의 Frontend 아키텍처 표준을 수립하고, React 생태계의 최신 트렌드(Server Components, Concurrent Mode)를 평가하며, 대규모 프로젝트의 성능 최적화를 주도합니다. Micro Frontend 아키텍처를 설계하고, React 컴파일러 최적화를 이해하며, 오픈소스 라이브러리를 제작합니다.

**구체적 예시:**
- React Server Components (RSC) 평가 및 도입
- Concurrent Mode, Suspense for Data Fetching
- Micro Frontend 아키텍처 (Module Federation)
- React 컴파일러 최적화 (Babel, SWC)
- 전사 Design System 구축 및 거버넌스
- React Core 코드 기여 또는 오픈소스 라이브러리 제작
- 대규모 마이그레이션 (Class → Functional, Redux → React Query)

**React Server Components 예시 (Next.js 13+):**
```jsx
// Expert: Server Components로 SEO + 성능 개선

// app/page.js (Server Component, default)
async function HomePage() {
  // 서버에서 데이터 fetch (클라이언트 번들에 포함 안 됨!)
  const posts = await fetch('https://api.example.com/posts').then(r => r.json());

  return (
    <div>
      <h1>Blog Posts</h1>
      {posts.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}

// 장점:
// 1. SEO: HTML에 데이터가 포함되어 검색 엔진이 크롤링 가능
// 2. 성능: 클라이언트 번들에 fetch 코드 포함 안 됨
// 3. Waterfall 방지: 여러 컴포넌트가 병렬로 데이터 fetch
```

**Micro Frontend 예시 (Module Federation):**
```javascript
// Expert: Module Federation으로 독립적인 앱 통합

// webpack.config.js (Host App)
module.exports = {
  plugins: [
    new ModuleFederationPlugin({
      name: 'host',
      remotes: {
        app1: 'app1@http://localhost:3001/remoteEntry.js',
        app2: 'app2@http://localhost:3002/remoteEntry.js'
      },
      shared: {
        react: { singleton: true },
        'react-dom': { singleton: true }
      }
    })
  ]
};

// Host App에서 사용
import React, { lazy, Suspense } from 'react';

const RemoteComponent1 = lazy(() => import('app1/Component'));
const RemoteComponent2 = lazy(() => import('app2/Component'));

function App() {
  return (
    <Suspense fallback="Loading...">
      <RemoteComponent1 />
      <RemoteComponent2 />
    </Suspense>
  );
}

// 장점:
// - 팀별로 독립적인 배포 가능
// - 각 앱이 다른 버전의 라이브러리 사용 가능
// - 런타임에 앱 통합 (빌드타임 의존성 없음)
```

**Performance Profiling 예시:**
```jsx
// Expert: React DevTools Profiler로 성능 병목 찾기

import { Profiler } from 'react';

function onRenderCallback(
  id, // 프로파일링된 컴포넌트 ID
  phase, // "mount" 또는 "update"
  actualDuration, // 렌더링 시간 (ms)
  baseDuration, // 최적화 없이 걸릴 시간
  startTime,
  commitTime,
  interactions
) {
  console.log(`${id} (${phase}): ${actualDuration}ms`);

  // 프로덕션에서는 analytics 전송
  if (actualDuration > 16) {  // 60fps = 16ms/frame
    sendToAnalytics({ id, phase, actualDuration });
  }
}

function App() {
  return (
    <Profiler id="App" onRender={onRenderCallback}>
      <Dashboard />
    </Profiler>
  );
}
```

---

## 🎯 Real-World Examples (실무 예시)

### Example 1: 실시간 검색 자동완성 (Intermediate)

**상황:**
검색창에 입력할 때마다 자동완성 결과를 실시간으로 표시해야 합니다.

**요구사항:**
- 입력 후 300ms 대기 (Debouncing)
- API 호출 중복 방지
- 로딩 상태 표시
- ESC 키로 자동완성 닫기 (접근성)

**구현 (Intermediate):**
```jsx
import React, { useState, useEffect, useRef } from 'react';

function SearchAutocomplete() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const debounceTimeout = useRef(null);

  useEffect(() => {
    // Debouncing: 300ms 대기 후 API 호출
    if (query.length < 2) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    setLoading(true);

    // 이전 타이머 취소
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      fetch(`/api/search?q=${encodeURIComponent(query)}`)
        .then(res => res.json())
        .then(data => {
          setResults(data);
          setLoading(false);
          setIsOpen(true);
        });
    }, 300);

    // Cleanup
    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, [query]);

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  return (
    <div className="autocomplete">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Search..."
        aria-autocomplete="list"
        aria-controls="autocomplete-list"
      />

      {loading && <div>Loading...</div>}

      {isOpen && results.length > 0 && (
        <ul id="autocomplete-list" role="listbox">
          {results.map((result, index) => (
            <li key={result.id} role="option" tabIndex={0}>
              {result.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
```

---

### Example 2: 무한 스크롤 (Advanced)

**상황:**
뉴스피드에서 스크롤 시 자동으로 다음 페이지를 로드해야 합니다.

**요구사항:**
- Intersection Observer로 스크롤 감지
- 중복 API 호출 방지
- 로딩 스피너
- 더 이상 데이터 없을 때 처리

**구현 (Advanced):**
```jsx
import React, { useState, useEffect, useRef, useCallback } from 'react';

function InfiniteScrollFeed() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef();

  // 마지막 요소에 대한 ref (Intersection Observer)
  const lastPostRef = useCallback((node) => {
    if (loading) return;

    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prev => prev + 1);
      }
    });

    if (node) observer.current.observe(node);
  }, [loading, hasMore]);

  useEffect(() => {
    setLoading(true);

    fetch(`/api/posts?page=${page}&limit=20`)
      .then(res => res.json())
      .then(data => {
        setPosts(prev => [...prev, ...data.posts]);
        setHasMore(data.hasMore);
        setLoading(false);
      });
  }, [page]);

  return (
    <div className="feed">
      {posts.map((post, index) => {
        // 마지막 요소에 ref 연결
        if (posts.length === index + 1) {
          return (
            <div ref={lastPostRef} key={post.id} className="post">
              <h3>{post.title}</h3>
              <p>{post.content}</p>
            </div>
          );
        } else {
          return (
            <div key={post.id} className="post">
              <h3>{post.title}</h3>
              <p>{post.content}</p>
            </div>
          );
        }
      })}

      {loading && <div>Loading more posts...</div>}
      {!hasMore && <div>No more posts</div>}
    </div>
  );
}
```

---

### Example 3: Design System (Expert)

**상황:**
조직 전체에서 사용할 재사용 가능한 Button 컴포넌트를 설계해야 합니다.

**요구사항:**
- 다양한 variants (primary, secondary, danger)
- sizes (small, medium, large)
- 접근성 (ARIA, 키보드 네비게이션)
- TypeScript 타입 안전성
- Storybook 문서화

**구현 (Expert):**
```tsx
// Button.tsx
import React, { forwardRef } from 'react';
import styled from 'styled-components';

type ButtonVariant = 'primary' | 'secondary' | 'danger';
type ButtonSize = 'small' | 'medium' | 'large';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  loading?: boolean;
  children: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'medium',
      fullWidth = false,
      loading = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <StyledButton
        ref={ref}
        variant={variant}
        size={size}
        fullWidth={fullWidth}
        disabled={disabled || loading}
        aria-busy={loading}
        {...props}
      >
        {loading ? <Spinner /> : children}
      </StyledButton>
    );
  }
);

Button.displayName = 'Button';

const StyledButton = styled.button<{
  variant: ButtonVariant;
  size: ButtonSize;
  fullWidth: boolean;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s;

  ${({ size }) => {
    switch (size) {
      case 'small':
        return 'padding: 8px 16px; font-size: 14px;';
      case 'large':
        return 'padding: 16px 32px; font-size: 18px;';
      default:
        return 'padding: 12px 24px; font-size: 16px;';
    }
  }}

  ${({ variant }) => {
    switch (variant) {
      case 'primary':
        return 'background: #007bff; color: white; &:hover { background: #0056b3; }';
      case 'secondary':
        return 'background: #6c757d; color: white; &:hover { background: #5a6268; }';
      case 'danger':
        return 'background: #dc3545; color: white; &:hover { background: #c82333; }';
    }
  }}

  ${({ fullWidth }) => fullWidth && 'width: 100%;'}

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &:focus-visible {
    outline: 2px solid #007bff;
    outline-offset: 2px;
  }
`;

const Spinner = styled.div`
  width: 16px;
  height: 16px;
  border: 2px solid white;
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;

  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

export default Button;
```

**Storybook 문서:**
```tsx
// Button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import Button from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'danger']
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large']
    }
  }
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary Button'
  }
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary Button'
  }
};

export const Loading: Story = {
  args: {
    loading: true,
    children: 'Loading...'
  }
};

export const FullWidth: Story = {
  args: {
    fullWidth: true,
    children: 'Full Width Button'
  }
};
```

---

## 📏 Evaluation Rubric (평가 루브릭)

### 5점 척도

| 점수 | Proficiency 매핑 | 평가 기준 | 행동적 앵커 |
|------|------------------|----------|-------------|
| **1점** | N/A | React 기본 개념을 이해하지 못함 | - JSX 문법을 모름<br>- useState를 사용할 줄 모름<br>- 컴포넌트를 함수로 작성하는 것을 이해 못함<br>- Props가 무엇인지 모름 |
| **2점** | **Beginner** | 간단한 컴포넌트를 튜토리얼 참고하여 작성 가능 | - useState로 카운터 구현<br>- useEffect로 API 호출 (dependency array 이해 부족)<br>- map으로 리스트 렌더링 (key는 index 사용)<br>- 조건부 렌더링 (&&, 삼항 연산자) |
| **3점** | **Intermediate** | 복잡한 UI 로직을 독립적으로 구현, Custom Hooks 작성 | - Custom Hooks (useFetch, useForm) 작성<br>- Context API로 Props Drilling 회피<br>- useCallback, React.memo로 성능 최적화<br>- Error Boundary, Suspense 사용<br>- React Router로 SPA 라우팅 |
| **4점** | Advanced | 복잡한 패턴 적용, Design System 구축, SSR/SSG | - Compound Components, Render Props 패턴<br>- Code Splitting (React.lazy) 적용<br>- Design System 구축 (Storybook)<br>- SSR/SSG 평가 및 도입<br>- React DevTools Profiler로 성능 분석 |
| **5점** | Expert | React 아키텍처 수립, Server Components, Micro Frontend | - React Server Components 평가 및 도입<br>- Micro Frontend 아키텍처 설계<br>- 전사 Design System 거버넌스<br>- 대규모 마이그레이션 주도 (Class → Functional)<br>- 오픈소스 라이브러리 제작 |

---

## 🧪 Assessment Methods (평가 방법)

### 1. Component Implementation (60분)
**과제:**
실시간 채팅 UI를 구현하세요.

**요구사항:**
- 메시지 목록 (자동 스크롤 to bottom)
- 메시지 입력 폼
- WebSocket 연결 (실제 연결 대신 setInterval로 mock)
- 읽음 표시 (내가 보낸 메시지 vs 상대방 메시지)

**평가 기준:**
- **2점:** 정적 UI만 구현, 상태 관리 없음
- **3점:** useState로 메시지 추가, useEffect로 자동 스크롤, 입력 폼 제어
- **4점:** Custom Hook (useChat), 메시지 그룹화 (날짜별), 타이핑 인디케이터

---

### 2. Performance Optimization (30분)
**과제:**
아래 느린 컴포넌트를 최적화하세요.

```jsx
function TodoApp() {
  const [todos, setTodos] = useState([...1000개의 todo]);

  return (
    <div>
      {todos.map(todo => (
        <TodoItem key={todo.id} todo={todo} onToggle={() => toggleTodo(todo.id)} />
      ))}
    </div>
  );
}

function TodoItem({ todo, onToggle }) {
  console.log('TodoItem rendered:', todo.id);  // 1000개 모두 매번 렌더링됨!
  return <li onClick={onToggle}>{todo.title}</li>;
}
```

**평가 기준:**
- **3점:** React.memo, useCallback 적용
- **4점:** Virtualized List (react-window) 도입, useMemo로 필터링 최적화
- **5점:** React DevTools Profiler로 병목 분석, Code Splitting 제안

---

### 3. Code Review (20분)
**과제:**
주니어 개발자가 작성한 아래 코드를 리뷰하세요.

```jsx
function UserProfile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch('/api/user').then(res => res.json()).then(setUser);
  });  // dependency array 없음!

  return (
    <div>
      <h1>{user.name}</h1>  {/* user가 null이면 에러! */}
      <p>{user.email}</p>
    </div>
  );
}
```

**평가 기준:**
- **2점:** "잘 모르겠습니다"
- **3점:** 4개 이상 문제 지적 (dependency array, 에러 처리, 로딩 상태, cleanup)
- **4점:** 개선 코드 작성, Custom Hook 제안
- **5점:** Suspense for Data Fetching, React Query 같은 대안 제안

---

## 🔗 Related Competencies (관련 역량)

### Prerequisites (선행 역량)
- **JavaScript ES6+:** Arrow Functions, Destructuring, Spread, Promises
- **HTML/CSS:** Semantic HTML, Flexbox, Grid
- **DOM Manipulation:** addEventListener, querySelector (React로 대체되지만 이해 필요)

### Related Competencies (연관 역량)
- **COMP-004: State Management** - Redux, Zustand, React Query
- **COMP-013: End-to-End System Integration** - Frontend-Backend API 연동
- **COMP-005: Testing & QA** - React Testing Library, Jest

### Next Level (다음 단계)
- **Next.js Development** - SSR, SSG, ISR, Server Components
- **React Native** - 모바일 앱 개발
- **Advanced Animation** - Framer Motion, React Spring

---

## 📚 Learning Resources (학습 자료)

### Beginner → Intermediate
- **공식 문서:** [React 공식 문서](https://react.dev/)
- **책:** "리액트를 다루는 기술" (김민준)
- **강의:** "Complete React Developer" (Udemy, Zero to Mastery)
- **도구:** React DevTools

### Intermediate → Advanced
- **책:** "Learning React" (Alex Banks, Eve Porcello)
- **강의:** "Epic React" (Kent C. Dodds)
- **문서:** [React Patterns](https://reactpatterns.com/)
- **도구:** Storybook, React Testing Library

### Advanced → Expert
- **문서:** [React RFC (Request for Comments)](https://github.com/reactjs/rfcs)
- **컨퍼런스:** React Conf, React Summit
- **오픈소스:** React Core, React Router, React Hook Form
- **도구:** Profiler, React Server Components

---

## 📊 Industry Benchmarks (산업 표준)

### O*NET Mapping
- **15-1254.00 Web Developers:** React는 가장 인기 있는 프론트엔드 라이브러리

### SFIA Mapping
- **SFIA Level 3 (Apply):** Intermediate - 독립적으로 React 컴포넌트 개발
- **SFIA Level 4 (Enable):** Advanced - Design System, 복잡한 패턴
- **SFIA Level 5 (Ensure):** Expert - Frontend 아키텍처 수립

### Market Data
- **LinkedIn Skills:** "React.js" - 3M+ 프로필 (가장 인기 있는 프론트엔드 스킬)
- **Stack Overflow Survey 2024:** 40.5%의 개발자가 React 사용 (1위)
- **Salary Impact:** React 역량은 Frontend 연봉에 15-20% 영향

---

## 🎯 Competency Questions (CQ) 매핑

이 Competency는 다음 CQs에 답합니다:

- **CQ-2:** "Frontend Engineer에게 필요한 핵심 기술 역량은?" → React Development (Base Competency)
- **CQ-5:** "Senior Frontend Engineer는 Mid와 어떤 차이가 있는가?" → React는 Intermediate, Advanced로 구분
- **CQ-6:** "Full-stack Engineer의 Base Competencies는?" → React Beginner
- **CQ-10:** "특정 Competency를 평가하는 면접 질문은?" → Rubric의 Assessment Methods

---

## 📝 Version History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0.0 | 2025-11-26 | Terry | Initial draft - Priority 3 competency for V1 |

---

## 👥 Approval Status

- **Terry (PM):** ✅ Draft 작성 완료
- **Berry (CTO):** ⏳ 기술 검토 대기
- **Borry (HR):** ⏳ 실무 검토 대기

---

**다음 작업:** COMP-010 Communication & Collaboration 작성 (Soft Skill)
