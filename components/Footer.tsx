export function Footer() {
  return (
    <footer>
      <span
        className="text-[30px] m-1 mx-auto items-center block text-center"
        style={{
          background: 'linear-gradient(45deg, #e5e7eb, #9ca3af, #6b7280, #e5e7eb)',
          backgroundSize: '300% 300%',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          animation: 'gradientShift 2s ease infinite'
        }}
      >
        ⚡︎
      </span>
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `
      }} />
    </footer>
  )
}
