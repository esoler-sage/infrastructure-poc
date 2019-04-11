# Infrastructure as Code

https://github.com/Azure/azure-cli/issues/6888
https://samcogan.com/modularisation-and-re-use-with-nested-arm-templates/

`az group deployment create --resource-group "Pegg_Dev_EnricRG" --template-file infra.json`
`node create-qna/index.js`

CLI

How to create a new knowledge base

You need an Azure Cognitive Services account for QnA Maker:

`pegg-iac kb -n my_cool_iac_kb -k d04a32daa7cd45d4936faf9c16a05b62`

How to create a new LUIS application

`pegg-iac kl -n my_cool_iac_luis -k 43f026ba1ed346e4a7bd6ccbde1e6719 --an pegg-LUIS-dev`

