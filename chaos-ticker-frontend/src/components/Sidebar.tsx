import { Company } from "@/types/Company"

interface SidebarProps {
  companies: Company[];
  choosedCompany: string|null;
  setСhoosedCompany: (value: string) => void
}

export const Sidebar = ({companies, choosedCompany, setСhoosedCompany}: SidebarProps) => {
  return (
    <section className="flex flex-col w-[15%]">
      {companies.map((company: Company, index: number) => 
        <button 
          onClick={() => setСhoosedCompany(company.name)}
          className="w-full p-2"
          style={choosedCompany===company.name ? {backgroundColor: '#80808025'} : {backgroundColor: ''}}
          key={index}
        >
          {company.name}
        </button>
      )}
    </section>
  )
}