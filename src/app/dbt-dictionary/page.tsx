/* eslint-disable id-length */
/* eslint-disable max-lines */
"use client";

import * as React from "react";

import { AppLayout } from "~/components/layouts";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import {
  type DbtEntity,
  type DbtMetric,
  type DbtModel,
  getSuggestedMetrics,
  mockDbtEntities,
  mockDbtMetrics,
  mockDbtModels,
  searchMetrics,
} from "~/mocks/dbtSemanticData";

type TabType = "entities" | "metrics" | "models";

const DbtDictionaryPage: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState<TabType>("metrics");
  const [searchQuery, setSearchQuery] = React.useState("");

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">dbt Semantic Dictionary</h1>
            <p className="text-gray-600 mt-1">View and enrich your dbt semantic layer definitions</p>
          </div>
          <div className="flex items-center space-x-2">
            <Badge className="bg-blue-500 text-white">🔵 dbt Connected</Badge>
          </div>
        </div>

        {/* Info Banner */}
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <div className="text-2xl">💡</div>
              <div className="flex-1 space-y-2">
                <h3 className="font-semibold text-blue-900">dbt is your source of truth</h3>
                <p className="text-sm text-blue-800">
                  Numize enhances your dbt semantic layer with natural language understanding. You can add friendly
                  names and synonyms here, but metric logic remains in dbt.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Search */}
        <div>
          <input
            type="text"
            placeholder="Search metrics, models, or entities..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
            }}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => {
                setActiveTab("metrics");
              }}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === "metrics"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Metrics ({mockDbtMetrics.length})
            </button>
            <button
              onClick={() => {
                setActiveTab("models");
              }}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === "models"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Models ({mockDbtModels.length})
            </button>
            <button
              onClick={() => {
                setActiveTab("entities");
              }}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === "entities"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Entities ({mockDbtEntities.length})
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        <div className="py-6">
          {activeTab === "metrics" && <MetricsTab searchQuery={searchQuery} />}
          {activeTab === "models" && <ModelsTab searchQuery={searchQuery} />}
          {activeTab === "entities" && <EntitiesTab searchQuery={searchQuery} />}
        </div>
      </div>
    </AppLayout>
  );
};

function MetricsTab({ searchQuery }: { searchQuery: string }) {
  const [selectedMetric, setSelectedMetric] = React.useState<DbtMetric | null>(null);
  const [editingSynonyms, setEditingSynonyms] = React.useState(false);
  const [newSynonym, setNewSynonym] = React.useState("");

  const metrics = searchQuery === "" ? mockDbtMetrics : searchMetrics(searchQuery);
  const suggestedMetrics = selectedMetric === null ? [] : getSuggestedMetrics(selectedMetric.name);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Metrics List */}
      <div className="lg:col-span-1 space-y-2">
        {metrics.map((metric) => (
          <button
            key={metric.name}
            onClick={() => {
              setSelectedMetric(metric);
            }}
            className={`w-full text-left p-4 border-2 rounded-lg transition-all ${
              selectedMetric?.name === metric.name
                ? "border-blue-600 bg-blue-50"
                : "border-gray-200 hover:border-blue-300 bg-white"
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{metric.label}</h3>
                <p className="text-xs text-gray-500 mt-1">{metric.name}</p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {metric.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              {metric.hasConflicts && (
                <Badge variant="outline" className="border-amber-500 text-amber-700 text-xs">
                  ⚠️
                </Badge>
              )}
            </div>
          </button>
        ))}
      </div>

      {/* Metric Details */}
      <div className="lg:col-span-2">
        {selectedMetric === null ? (
          <div className="text-center py-16">
            <p className="text-gray-500">Select a metric to view details</p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Header */}
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl">{selectedMetric.label}</CardTitle>
                    <p className="text-sm text-gray-500 mt-1">
                      <code className="text-blue-600">{selectedMetric.name}</code>
                    </p>
                  </div>
                  {selectedMetric.hasConflicts && (
                    <Badge variant="outline" className="border-amber-500 text-amber-700">
                      ⚠️ Has conflicts
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-1">Description</h4>
                  <p className="text-gray-900">{selectedMetric.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-1">Type</h4>
                    <Badge variant="secondary">{selectedMetric.type}</Badge>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-1">Owner</h4>
                    <p className="text-sm text-gray-900">{selectedMetric.owner}</p>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-1">Source Model</h4>
                  <code className="text-sm bg-gray-100 px-2 py-1 rounded">{selectedMetric.model}</code>
                </div>
              </CardContent>
            </Card>

            {/* SQL Definition */}
            <Card>
              <CardHeader>
                <CardTitle>SQL Definition (Read-Only)</CardTitle>
                <CardDescription>This logic is managed in dbt and cannot be edited here</CardDescription>
              </CardHeader>
              <CardContent>
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm font-mono">
                  <code>{selectedMetric.sql}</code>
                </pre>
              </CardContent>
            </Card>

            {/* Synonyms */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Natural Language Synonyms</CardTitle>
                    <CardDescription>Add terms that users might use to refer to this metric</CardDescription>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setEditingSynonyms(!editingSynonyms);
                    }}
                  >
                    {editingSynonyms ? "Done" : "Edit"}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex flex-wrap gap-2">
                  {selectedMetric.synonyms.map((synonym, idx) => (
                    <Badge key={idx} variant="outline" className="text-sm">
                      {synonym}
                    </Badge>
                  ))}
                </div>

                {editingSynonyms && (
                  <div className="flex space-x-2 pt-2">
                    <input
                      type="text"
                      placeholder="Add new synonym..."
                      value={newSynonym}
                      onChange={(e) => {
                        setNewSynonym(e.target.value);
                      }}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                    <Button
                      size="sm"
                      onClick={() => {
                        if (newSynonym.trim() !== "") {
                          // In real app: save synonym
                          setNewSynonym("");
                        }
                      }}
                    >
                      Add
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Dimensions */}
            {selectedMetric.dimensions !== undefined && selectedMetric.dimensions.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Available Dimensions</CardTitle>
                  <CardDescription>Use these dimensions to group or filter this metric</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {selectedMetric.dimensions.map((dim) => (
                      <Badge key={dim} variant="secondary">
                        {dim}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Suggested Related Metrics */}
            {suggestedMetrics.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Related Metrics</CardTitle>
                  <CardDescription>Metrics that users often explore together</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {suggestedMetrics.map((metric) => (
                      <button
                        key={metric.name}
                        onClick={() => {
                          setSelectedMetric(metric);
                        }}
                        className="w-full text-left p-3 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all"
                      >
                        <div className="font-medium text-gray-900">{metric.label}</div>
                        <div className="text-sm text-gray-600">{metric.description}</div>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Export Suggestions */}
            <Card>
              <CardHeader>
                <CardTitle>Export dbt Suggestions</CardTitle>
                <CardDescription>Copy suggestions to add to your dbt project</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" size="sm">
                  Copy YAML Snippet
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}

function ModelsTab({ searchQuery }: { searchQuery: string }) {
  const [selectedModel, setSelectedModel] = React.useState<DbtModel | null>(null);

  const models =
    searchQuery === ""
      ? mockDbtModels
      : mockDbtModels.filter(
          (m) =>
            m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            m.label.toLowerCase().includes(searchQuery.toLowerCase()),
        );
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Models List */}
      <div className="lg:col-span-1 space-y-2">
        {models.map((model) => (
          <button
            key={model.name}
            onClick={() => {
              setSelectedModel(model);
            }}
            className={`w-full text-left p-4 border-2 rounded-lg transition-all ${
              selectedModel?.name === model.name
                ? "border-blue-600 bg-blue-50"
                : "border-gray-200 hover:border-blue-300 bg-white"
            }`}
          >
            <h3 className="font-semibold text-gray-900">{model.label}</h3>
            <p className="text-xs text-gray-500 mt-1">
              <code>{model.name}</code>
            </p>
            <p className="text-xs text-gray-600 mt-2">{model.columns.length} columns</p>
          </button>
        ))}
      </div>

      {/* Model Details */}
      <div className="lg:col-span-2">
        {selectedModel === null ? (
          <div className="text-center py-16">
            <p className="text-gray-500">Select a model to view details</p>
          </div>
        ) : (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">{selectedModel.label}</CardTitle>
                <p className="text-sm text-gray-500 mt-1">
                  <code className="text-blue-600">
                    {selectedModel.schema}.{selectedModel.name}
                  </code>
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-1">Description</h4>
                  <p className="text-gray-900">{selectedModel.description}</p>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Tags</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedModel.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Columns */}
            <Card>
              <CardHeader>
                <CardTitle>Columns</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {selectedModel.columns.map((column) => (
                    <div key={column.name} className="border-b border-gray-100 pb-3 last:border-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <code className="text-sm font-medium text-gray-900">{column.name}</code>
                            <Badge variant="outline" className="text-xs">
                              {column.type}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{column.description}</p>
                          {column.tests !== undefined && column.tests.length > 0 && (
                            <div className="flex items-center space-x-1 mt-1">
                              {column.tests.map((test) => (
                                <Badge key={test} variant="secondary" className="text-xs">
                                  {test}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Lineage */}
            <Card>
              <CardHeader>
                <CardTitle>Lineage</CardTitle>
                <CardDescription>Model dependencies and downstream usage</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {selectedModel.upstreamModels.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Upstream Models</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedModel.upstreamModels.map((model) => (
                        <Badge key={model} variant="outline">
                          {model}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {selectedModel.downstreamModels.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Downstream Models</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedModel.downstreamModels.map((model) => (
                        <Badge key={model} variant="outline">
                          {model}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}

function EntitiesTab({ searchQuery }: { searchQuery: string }) {
  const [selectedEntity, setSelectedEntity] = React.useState<DbtEntity | null>(null);

  const entities =
    searchQuery === ""
      ? mockDbtEntities
      : mockDbtEntities.filter(
          (e) =>
            e.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            e.label.toLowerCase().includes(searchQuery.toLowerCase()),
        );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Entities List */}
      <div className="lg:col-span-1 space-y-2">
        {entities.map((entity) => (
          <button
            key={entity.name}
            onClick={() => {
              setSelectedEntity(entity);
            }}
            className={`w-full text-left p-4 border-2 rounded-lg transition-all ${
              selectedEntity?.name === entity.name
                ? "border-blue-600 bg-blue-50"
                : "border-gray-200 hover:border-blue-300 bg-white"
            }`}
          >
            <h3 className="font-semibold text-gray-900">{entity.label}</h3>
            <p className="text-xs text-gray-500 mt-1">{entity.name}</p>
          </button>
        ))}
      </div>

      {/* Entity Details */}
      <div className="lg:col-span-2">
        {selectedEntity === null ? (
          <div className="text-center py-16">
            <p className="text-gray-500">Select an entity to view details</p>
          </div>
        ) : (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">{selectedEntity.label}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-1">Description</h4>
                  <p className="text-gray-900">{selectedEntity.description}</p>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-1">Primary Key</h4>
                  <code className="text-sm bg-gray-100 px-2 py-1 rounded">{selectedEntity.primaryKey}</code>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Synonyms</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedEntity.synonyms.map((syn, idx) => (
                      <Badge key={idx} variant="outline">
                        {syn}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Related Models</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedEntity.relatedModels.map((model) => (
                      <Badge key={model} variant="secondary">
                        {model}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}

export default DbtDictionaryPage;
