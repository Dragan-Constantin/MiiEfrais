import { useState } from 'react';
import { FaInfoCircle, FaSearch } from 'react-icons/fa';

interface Module {
  ue: string;
  ueCode: string;
  modules: {
    name: string;
    professor: string;
    type: string;
    coefficient: string;
    grade: string | null;
  }[];
  grade: string | null;
}

const GradesComponent = () => {
  const [selectedSemester, setSelectedSemester] = useState('2024-2025 - S6');
  
  const modules: Module[] = [
    {
      ue: 'UE - Développement applications Web et Mobile',
      ueCode: 'ECTS - 0/2',
      grade: '13.8',
      modules: [
        {
          name: 'Jakarta Entreprise Edition (Rappel Java + JEE)',
          professor: 'MARTIN Kelig',
          type: 'CTD',
          coefficient: '(1)',
          grade: '13.8'
        },
        {
          name: 'React.js',
          professor: 'BISSOR Melvin',
          type: 'CTD',
          coefficient: '(1)',
          grade: null
        }
      ]
    },
    {
      ue: 'UE - Formation professionnelle',
      ueCode: 'ECTS - 0/18',
      grade: null,
      modules: [
        {
          name: 'Expérience Professionnelle - Stage alterné Bachelor 3',
          professor: '',
          type: 'B3-TP',
          coefficient: '(1)',
          grade: null
        }
      ]
    },
    {
      ue: 'UE - Informatique et systèmes d\'information',
      ueCode: 'ECTS - 0/2',
      grade: '12',
      modules: [
        {
          name: 'Docker avancé',
          professor: 'MAVRODIS Michael',
          type: 'CTD',
          coefficient: '(1)',
          grade: null
        },
        {
          name: 'Secure coding - OWASP',
          professor: 'SIBER Eric',
          type: 'CTD',
          coefficient: '(1)',
          grade: '12'
        }
      ]
    }
  ];

  return (
    <div className="bg-white rounded-3xl p-8 shadow-sm">
      <h1 className="text-[#163767] text-3xl font-bold mb-6">Notes</h1>

      {/* Info Banner */}
      <div className="bg-blue-50 p-4 rounded-lg mb-6 flex items-start gap-3">
        <FaInfoCircle className="text-blue-500 mt-1" />
        <p className="text-gray-600">
          Toutes les moyennes sont des <span className="font-medium">estimations</span> réalisées en fonction des notes publiées sur myEfrei. Celles-ci n'ont pas de valeur académique. Vos moyennes officielles vous seront communiquées lors des jurys de fin de semestre.
        </p>
      </div>

      {/* Controls */}
      <div className="flex justify-between items-center mb-6">
        <div className="relative">
          <select
            value={selectedSemester}
            onChange={(e) => setSelectedSemester(e.target.value)}
            className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-10"
          >
            <option>2024-2025 - S6</option>
          </select>
          <FaSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
        </div>

        {/* Overall Average */}
        <div className="flex items-center gap-3">
          <div className="text-sm text-gray-600">Moyenne générale</div>
          <div className="flex items-center gap-2">
            <div className="w-12 h-12 rounded-full border-4 border-green-500 flex items-center justify-center">
              <div className="text-green-500 font-medium">75%</div>
            </div>
            <div className="text-2xl font-bold">14.62/20</div>
          </div>
        </div>
      </div>

      {/* Grades Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-4 px-4 font-medium text-gray-600">UE</th>
              <th className="text-left py-4 px-4 font-medium text-gray-600">Module</th>
              <th className="text-left py-4 px-4 font-medium text-gray-600">Type</th>
              <th className="text-left py-4 px-4 font-medium text-gray-600">Coef</th>
              <th className="text-left py-4 px-4 font-medium text-gray-600">Moyenne/Résultat</th>
            </tr>
          </thead>
          <tbody>
            {modules.map((ue, ueIndex) => (
              <>
                {/* UE Row */}
                <tr key={`ue-${ueIndex}`} className="bg-gray-50">
                  <td colSpan={4} className="py-3 px-4">
                    <div className="font-medium">{ue.ue}</div>
                    <div className="text-sm text-gray-500">{ue.ueCode}</div>
                  </td>
                  <td className="py-3 px-4 font-medium">{ue.grade || '-'}</td>
                </tr>
                {/* Module Rows */}
                {ue.modules.map((module, moduleIndex) => (
                  <tr key={`module-${ueIndex}-${moduleIndex}`} className="border-b">
                    <td className="py-3 px-4"></td>
                    <td className="py-3 px-4">
                      <div>{module.name}</div>
                      {module.professor && (
                        <div className="text-sm text-gray-500">{module.professor}</div>
                      )}
                    </td>
                    <td className="py-3 px-4 text-gray-600">{module.type}</td>
                    <td className="py-3 px-4 text-gray-600">{module.coefficient}</td>
                    <td className="py-3 px-4">{module.grade || '-'}</td>
                  </tr>
                ))}
              </>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GradesComponent; 