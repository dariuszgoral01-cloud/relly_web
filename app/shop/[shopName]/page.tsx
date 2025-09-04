
import ShopDetail from './ShopDetail';

export async function generateStaticParams() {
  return [
    { shopName: 'asda' },
    { shopName: 'tesco' },
    { shopName: 'amazon-uk' },
    { shopName: 'sainsburys' },
  ];
}

export default function ShopPage({ params }: { params: { shopName: string } }) {
  return <ShopDetail shopName={params.shopName} />;
}
