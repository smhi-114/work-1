import dynamic from 'next/dynamic'

const HeavyComponent = dynamic(
  () => import('@/components/heavy-component'),
  {
    loading: () => <p>Loading...</p>,
    ssr: false
  }
)