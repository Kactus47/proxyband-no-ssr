export const Footer = () => {
  
  const currenYear = new Date().getFullYear();

  return (
    <footer className="footer">
        &copy; {currenYear}
    </footer>
  )
}