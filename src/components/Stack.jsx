import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useState, useEffect } from 'react';

function CardRotate({ children, onSendToBack, sensitivity, disableDrag = false }) {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useTransform(y, [-150, 150], [30, -30]);
    const rotateY = useTransform(x, [-150, 150], [-30, 30]);

    function handleDragEnd(_, info) {
        if (Math.abs(info.offset.x) > sensitivity || Math.abs(info.offset.y) > sensitivity) {
            onSendToBack();
        } else {
            x.set(0);
            y.set(0);
        }
    }

    if (disableDrag) {
        return (
            <motion.div className="absolute inset-0 cursor-pointer" style={{ x: 0, y: 0 }}>
                {children}
            </motion.div>
        );
    }

    return (
        <motion.div
            className="absolute inset-0 cursor-grab active:cursor-grabbing"
            style={{ x, y, rotateX, rotateY }}
            drag
            dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
            dragElastic={0.6}
            whileTap={{ cursor: 'grabbing' }}
            onDragEnd={handleDragEnd}
        >
            {children}
        </motion.div>
    );
}

export default function Stack({
    randomRotation = false,
    sensitivity = 150,
    cards = [],
    animationConfig = { stiffness: 260, damping: 20 },
    sendToBackOnClick = false,
    autoplay = false,
    autoplayDelay = 4000,
    pauseOnHover = false,
    mobileClickOnly = false,
    mobileBreakpoint = 768,
    onChange
}) {
    const [isMobile, setIsMobile] = useState(false);
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < mobileBreakpoint);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, [mobileBreakpoint]);

    const shouldDisableDrag = mobileClickOnly && isMobile;
    const shouldEnableClick = sendToBackOnClick || shouldDisableDrag;

    const [stack, setStack] = useState(() => {
        if (cards.length) {
            return cards.map((content, index) => ({ id: index + 1, content }));
        }
        return [];
    });

    useEffect(() => {
        if (cards.length) {
            setStack(cards.map((content, index) => ({ id: index + 1, content })));
        }
    }, [cards]);

    const sendToBack = id => {
        setStack(prev => {
            const newStack = [...prev];
            const index = newStack.findIndex(card => card.id === id);
            const [card] = newStack.splice(index, 1);
            newStack.unshift(card);

            // Trigger active card changes to keep parent state synchronized
            const topCard = newStack[newStack.length - 1];
            if (onChange && topCard) {
                onChange(topCard.id - 1);
            }
            return newStack;
        });
    };

    useEffect(() => {
        if (autoplay && stack.length > 1 && !isPaused) {
            const interval = setInterval(() => {
                const topCardId = stack[stack.length - 1].id;
                sendToBack(topCardId);
            }, autoplayDelay);

            return () => clearInterval(interval);
        }
    }, [autoplay, autoplayDelay, stack, isPaused]);

    const [showTutorial, setShowTutorial] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setShowTutorial(false), 4500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div
            className="relative w-full h-full"
            style={{
                perspective: 1000
            }}
            onMouseEnter={() => pauseOnHover && setIsPaused(true)}
            onMouseLeave={() => pauseOnHover && setIsPaused(false)}
        >
            {stack.map((card, index) => {
                const randomRotate = randomRotation ? Math.random() * 8 - 4 : 0;
                return (
                    <CardRotate
                        key={card.id}
                        onSendToBack={() => sendToBack(card.id)}
                        sensitivity={sensitivity}
                        disableDrag={shouldDisableDrag}
                    >
                        <motion.div
                            className="rounded-2xl overflow-hidden w-full h-full bg-[#131316] border border-white/10 shadow-2xl"
                            onClick={() => shouldEnableClick && sendToBack(card.id)}
                            animate={{
                                rotateZ: (stack.length - index - 1) * 3 + randomRotate,
                                scale: 1 + index * 0.05 - stack.length * 0.05,
                                transformOrigin: '90% 90%',
                                zIndex: index
                            }}
                            initial={false}
                            transition={{
                                type: 'spring',
                                stiffness: animationConfig.stiffness,
                                damping: animationConfig.damping
                            }}
                        >
                            {card.content}
                        </motion.div>
                    </CardRotate>
                );
            })}

            {/* Tutorial Overlay */}
            {showTutorial && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 z-[100] flex items-center justify-center pointer-events-none"
                >
                    <div className="relative w-full h-full">
                        <motion.div
                            animate={{
                                x: [0, 80, 0],
                                opacity: [0, 1, 1, 0]
                            }}
                            transition={{
                                duration: 2.2,
                                repeat: 1,
                                ease: "easeInOut"
                            }}
                            className="absolute top-1/2 left-1/4 -translate-y-1/2"
                        >
                            <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full border border-white/40 flex items-center justify-center">
                                <div className="w-3.5 h-3.5 bg-white rounded-full animate-ping" />
                            </div>
                            <p className="text-white font-mono font-bold text-[8px] mt-2 text-center uppercase tracking-widest bg-black/60 px-2 py-0.5 rounded border border-white/10">Drag or Click Card</p>
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </div>
    );
}
