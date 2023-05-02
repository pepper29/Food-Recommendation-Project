import { useEffect, useState, useRef } from "react";

/* [작품 검색 첫 페이지] 스크롤 시, 뷰포트에 위치한 이미지 레이지 로딩을 위한 함수*/
export function useLazyImageHandler({ src }) {
    const [imgSrc, setImgSrc] = useState(null);
    const imgRef = useRef(null);

    useEffect(() => {
        let observer;
        if (imgSrc !== src) {
            observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        setImgSrc(src);
                        observer.unobserve(imgRef.current);
                    }
                },
                { threshold: [0.25] }
            );
            observer.observe(imgRef.current);
        }
        return () => {
            observer && observer.disconnect();
        };
    }, [imgRef, imgSrc, src]);

    return { imgSrc, imgRef };
}
