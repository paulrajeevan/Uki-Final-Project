import { useState, useEffect } from "react";
import API from "../api/axios";
import { Layers, CheckCircle2 } from "lucide-react";

const AcademicSelector = ({ onselect }) => {
  const [hierarchy, setHierarchy] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedSubjectId, setSelectedSubjectId] = useState("");
  const [selectedUnitIndex, setSelectedUnitIndex] = useState("");
  const [selectedTopicName, setSelectedTopicName] = useState("");

  useEffect(() => {
    const fetchAcademicData = async () => {
      try {
        const response = await API.get("/academic");
        setHierarchy(response.data);
      } catch (error) {
        console.error("Failed to load academic data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAcademicData();
  }, []);

  const selectedSubject = hierarchy.find(
    (item) => item._id === selectedSubjectId,
  );
  const units = selectedSubject ? selectedSubject.units : [];
  const selectedUnit =
    selectedUnitIndex !== "" ? units[selectedUnitIndex] : null;
  const topics = selectedUnit ? selectedUnit.topics : [];

  const handleSubjectChange = (e) => {
    setSelectedSubjectId(e.target.value);
    setSelectedUnitIndex("");
    setSelectedTopicName("");
  };

  const handleUnitChange = (e) => {
    setSelectedUnitIndex(e.target.value);
    setSelectedTopicName("");
  };

  const handleTopicChange = (e) => {
    const topic = e.target.value;
    setSelectedTopicName(topic);

    if (onselect && selectedSubject && selectedUnit) {
      onselect({
        grade: selectedSubject.grade,
        stream: selectedSubject.stream,
        subject: selectedSubject.subject,
        unitNumber: selectedUnit.unitNumber,
        unitTitle: selectedUnit.title,
        topicName: topic,
      });
    }
  };

  if (loading) {
    return (
      <div className="p-r text-center text-slate-500 text-sm animate-pulse">
        Loading syllabus & subject ...
      </div>
    );
  }

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
      <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
        <Layers className="w-5 h-5 text-brand-blue" />
        <h3 className="font-semibold text-slate-800 text-sm">
          Select Curriculum & Topic
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">
            Subject
          </label>
          <select value={selectedSubjectId} onChange={handleSubjectChange} className="w-full text-sm border border-slate-300 rounded-lg p-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-brand-blue">
            <option value="">-- Choose Subject --</option>
            {hierarchy.map((item)=>(
                <option key={item._id} value={item._id}>
                    {item.grade} • {item.subject}
                </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default AcademicSelector;
