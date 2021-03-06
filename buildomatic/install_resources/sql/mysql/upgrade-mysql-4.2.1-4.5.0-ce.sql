
    ALTER TABLE JIQuery MODIFY
        sql_query MEDIUMTEXT NOT NULL;

--

    ALTER TABLE JICustomDatasourceProperty MODIFY
        value VARCHAR(1000);

    ALTER TABLE JIJdbcDatasource MODIFY
        connectionUrl VARCHAR(500);

    ALTER TABLE JIOlapUnit MODIFY
        mdx_query VARCHAR(3600) NOT NULL;

    ALTER TABLE JIReportJob MODIFY
        description VARCHAR(2000);

    ALTER TABLE JIReportJobMail MODIFY
        message VARCHAR(2000);

--

     ALTER TABLE JIReportJobParameter MODIFY
        parameter_value longblob;

--

    ALTER TABLE JIOlapUnit MODIFY
        mdx_query MEDIUMTEXT NOT NULL;

--

    ALTER TABLE JIDataType
        CHANGE maxValue max_value TINYBLOB;