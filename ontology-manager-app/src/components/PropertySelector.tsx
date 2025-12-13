/**
 * Property Selector Component
 * 
 * Allows users to select existing properties from the global pool
 * to add to a class, enabling property reuse across classes.
 */

import { useState, useMemo } from 'react';
import { useSchemaStore } from '../stores/useSchemaStore';
import { Link2, Search } from 'lucide-react';
import { cn } from '../lib/utils';
import { useTranslation } from 'react-i18next';

interface PropertySelectorProps {
    classId: string;
    onPropertyLinked: (propertyId: string) => void;
    onClose: () => void;
}

export function PropertySelector({ classId, onPropertyLinked, onClose }: PropertySelectorProps) {
    const { t } = useTranslation();
    const { schema, linkPropertyToClass } = useSchemaStore();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedRequired, setSelectedRequired] = useState(true);

    // Get properties not already linked to this class
    const availableProperties = useMemo(() => {
        const linkedPropertyIds = new Set(
            schema.propertyLinks
                .filter(link => link.classId === classId)
                .map(link => link.propertyId)
        );

        const available: Array<{
            id: string;
            name: string;
            dataType: string;
            usedByCount: number;
            usedByClasses: string[];
        }> = [];

        schema.properties.forEach((prop, propId) => {
            if (linkedPropertyIds.has(propId)) return;

            const usedByLinks = schema.propertyLinks.filter(link => link.propertyId === propId);
            const usedByClasses = usedByLinks.map(link => {
                const cls = schema.classes.get(link.classId);
                return cls?.name || link.classId;
            });

            available.push({
                id: propId,
                name: prop.name,
                dataType: prop.dataType,
                usedByCount: usedByLinks.length,
                usedByClasses
            });
        });

        // Filter by search term
        if (searchTerm) {
            return available.filter(p =>
                p.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Sort by usage count (most used first)
        return available.sort((a, b) => b.usedByCount - a.usedByCount);
    }, [schema, classId, searchTerm]);

    const handleSelectProperty = (propertyId: string) => {
        linkPropertyToClass(classId, propertyId, selectedRequired);
        onPropertyLinked(propertyId);
        onClose();
    };

    const dataTypeColors: Record<string, string> = {
        text: 'bg-green-500',
        number: 'bg-purple-500',
        date: 'bg-yellow-500',
        boolean: 'bg-red-500'
    };

    return (
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-4 shadow-xl max-w-sm w-full">
            <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-slate-200 flex items-center gap-2">
                    <Link2 className="w-4 h-4" />
                    {t('reuse_property') || 'Reuse Existing Property'}
                </h3>
                <button
                    onClick={onClose}
                    className="text-slate-400 hover:text-slate-200 text-xl"
                >
                    ×
                </button>
            </div>

            {/* Search */}
            <div className="relative mb-3">
                <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                    type="text"
                    placeholder={t('search_properties') || 'Search properties...'}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-8 pr-3 py-2 bg-slate-900 border border-slate-600 rounded text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {/* Required toggle */}
            <label className="flex items-center gap-2 mb-3 text-sm text-slate-300">
                <input
                    type="checkbox"
                    checked={selectedRequired}
                    onChange={(e) => setSelectedRequired(e.target.checked)}
                    className="rounded bg-slate-700 border-slate-600"
                />
                {t('mark_as_required') || 'Mark as Required'}
            </label>

            {/* Property list */}
            <div className="max-h-60 overflow-y-auto space-y-1">
                {availableProperties.length === 0 ? (
                    <div className="text-slate-400 text-sm text-center py-4">
                        {searchTerm
                            ? (t('no_properties_found') || 'No properties found')
                            : (t('all_properties_already_linked') || 'All properties already linked')
                        }
                    </div>
                ) : (
                    availableProperties.map((prop) => (
                        <button
                            key={prop.id}
                            onClick={() => handleSelectProperty(prop.id)}
                            className="w-full flex items-center gap-2 p-2 rounded hover:bg-slate-700 transition-colors text-left"
                        >
                            <div className={cn('w-2 h-2 rounded-full', dataTypeColors[prop.dataType])} />
                            <div className="flex-1 min-w-0">
                                <div className="font-medium text-slate-200 text-sm truncate">
                                    {prop.name}
                                </div>
                                {prop.usedByCount > 0 && (
                                    <div className="text-xs text-slate-400 truncate">
                                        Used by: {prop.usedByClasses.slice(0, 2).join(', ')}
                                        {prop.usedByClasses.length > 2 && ` +${prop.usedByClasses.length - 2}`}
                                    </div>
                                )}
                            </div>
                            <div className="text-xs text-slate-500 bg-slate-700 px-1.5 py-0.5 rounded">
                                {prop.dataType}
                            </div>
                        </button>
                    ))
                )}
            </div>

            {/* Info text */}
            <div className="mt-3 pt-3 border-t border-slate-700 text-xs text-slate-400">
                💡 {t('property_reuse_hint') || 'Reusing properties keeps your ontology consistent and enables better queries.'}
            </div>
        </div>
    );
}
