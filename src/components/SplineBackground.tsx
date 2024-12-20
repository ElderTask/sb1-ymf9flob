import Spline from '@splinetool/react-spline';

export default function SplineBackground() {
  return (
    <div className="fixed inset-0 -z-10 opacity-60">
      <Spline 
        scene="https://prod.spline.design/6PYx-o5kfo8-K8EP/scene.splinecode"
        className="w-full h-full"
      />
    </div>
  );
}