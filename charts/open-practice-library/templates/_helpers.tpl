{{/* vim: set filetype=mustache: */}}
{{/*
Create chart name and version for chart label
*/}}
{{- define "opl-cms.chart" -}}
{{- printf "%s-%s" .Chart.Name .Chart.Version | replace "+" "_" | trunc 63 | trimSuffix "-" -}}
{{- end -}}
